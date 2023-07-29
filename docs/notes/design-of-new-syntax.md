---
title: Design of New Syntax
author: Xie Yuheng
date: 2023-07-27
---

# Intro

First of all, What we need to express?
What aspects (features, relations) we need to use syntax to distinguish?

Is design of syntax like design of graphic,
where we give many choices and compare them?

# Examples

## Nat

Use `defnode` to define a node.

`--` separates input ports from output ports in the definition.

Use `!` as prefix to mark the principle port.

```inet
defnode zero -- !return: Nat end

defnode add1 prev: Nat -- !return: Nat end

defnode add !x: Nat y: Nat -- return: Nat end
```

If there is only one output port,
the `return` is the default name,
thus can be omitted.

```inet
defnode zero -- !Nat end

defnode add1 prev: Nat -- !Nat end

defnode add !x: Nat y: Nat -- Nat end
```

Use `defrule` to define a rule,
use `(<node>)-<port>` to push port to the stack,
use `<port>-(<node>)` to weld a port to the top port on the stack.

```inet
defrule zero add
  (add)-y return-(add)
end

defrule add1 add
  (add1)-prev
  (add)-y
  add add1
  return-(add)
end
```

`defru` is a short hand for simple `defrule`.

```inet
defru zero add end

defru add1 add add add1 end
```

```inet
defnet two
  zero add1
  zero add1
  add
end

defnet four
  two two add
end
```

## List

We use a simple type system like Haskell (for now).

```inet
defnode sole -- !Trivial end

defnode null -- !List('a) end

defnode cons
  head: List('a)
  tail: List('a)
  -- !List('a)
end

defnode append
  left: !List('a)
  right: List('a)
  -- List('a)
end

defrule null append
  (append)-right return-(append)
end

defrule cons append
  (cons)-tail (append)-right append
  (cons)-head cons
  return-(append)
end

defru null append end

# the syntax for `let` and `get` is yet to be designed.
# I use `<...>` and description for work-in-progress syntax design.

defru cons append
  <let head> append <get head> cons
end

defnet six_soles
  null sole cons sole cons sole cons
  null sole cons sole cons sole cons
  append
end
```

## DiffList

```inet
defnode diff
  left: List('a)
  right: List('a)
  -- !DiffList('a)
end

defnode diff_append
  !left: DiffList('a)
  right: DiffList('a)
  -- DiffList('a)
end

defnode diff_open
  !DiffList('a)
  list: List('a)
  -- List('a)
end

defrule diff diff_append
  (diff)-right (diff_append)-right diff_open
  (diff)-left diff
end

defrule diff diff_open
  (diff)-right list-(diff_open)
  (diff)-left return-(diff_open)
end

defru diff diff_append
  <let diff_list end start>
  <get end> <get diff_list>
  diff_open <get start> diff
end

defru diff diff_open
  <let list end start>
  <get list> <get end> connect
  <get start>
end
```

`wire` places the two ports of a special edge on the stack.

If a wire's two ports are connected with port `A` and `B`,
after building a net, we remove the wire, and connect `A` with `B`.

```inet
defnet one_two_soles
  wire sole cons diff
  wire sole cons sole cons diff
  diff_append
end

defnet two_two_soles
  wire sole cons sole cons diff
  wire sole cons sole cons diff
  diff_append
end
```
