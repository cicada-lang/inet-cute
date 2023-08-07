---
title: Design of New Syntax
author: Xie Yuheng
date: 2023-07-27
---

# Nat

Use `defnode` to define a node.

`--` separates input ports from output ports in the definition.

Use `!` as postfix to mark the principal port.

```monoid
defnode zero -- return: Nat! end

defnode add1 prev: Nat -- return: Nat! end

defnode add x: Nat! y: Nat -- return: Nat end
```

If there is only one output port,
the `return` is the default name,
thus can be omitted.

```monoid
defnode zero -- Nat! end

defnode add1 prev: Nat -- Nat! end

defnode add x: Nat! y: Nat -- Nat end
```

Use `defrule` to define a rule,
use `(<node>)-<port>` to push port to the stack,
use `<port>-(<node>)` to weld a port to the top port on the stack.

```monoid
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

```monoid
defru zero add end

defru add1 add add add1 end
```

```monoid
defn two
  zero add1
  zero add1
  add
end

defn four
  two two add
end
```

# List

We use a simple type system like Haskell (for now).

```monoid
defnode sole -- Trivial! end

defnode null -- List('A)! end

defnode cons
  head: List('A)
  tail: List('A)
  -- List('A)!
end

defnode append
  left: List('A)!
  right: List('A)
  -- List('A)
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

defn six_soles
  null sole cons sole cons sole cons
  null sole cons sole cons sole cons
  append
end
```

# DiffList

```monoid
defnode diff
  left: List('A)
  right: List('A)
  -- DiffList('A)!
end

defnode diff_append
  left: DiffList('A)!
  right: DiffList('A)
  -- DiffList('A)
end

defnode diff_open
  DiffList('A)!
  list: List('A)
  -- List('A)
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

```monoid
defn one_two_soles
  wire sole cons diff
  wire sole cons sole cons diff
  diff_append
end

defn two_two_soles
  wire sole cons sole cons diff
  wire sole cons sole cons diff
  diff_append
end
```
