---
title: Design of New Syntax
author: Xie Yuheng
date: 2023-07-27
---

# Nat

Use `defnode` to define a node.

`--` separates input ports from output ports in the definition.

Use `!` as postfix to mark the principal port.

```inet
defnode zero -- return: Nat! end

defnode add1 prev: Nat -- return: Nat! end

defnode add x: Nat! y: Nat -- return: Nat end
```

If there is only one output port,
the `return` is the default name,
thus can be omitted.

```inet
defnode zero -- Nat! end

defnode add1 prev: Nat -- Nat! end

defnode add x: Nat! y: Nat -- Nat end
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

```inet
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

defn sixSoles
  null sole cons sole cons sole cons
  null sole cons sole cons sole cons
  append
end
```

# DiffList

```inet
defnode diff
  left: List('A)
  right: List('A)
  -- DiffList('A)!
end

defnode diffAppend
  left: DiffList('A)!
  right: DiffList('A)
  -- DiffList('A)
end

defnode diffOpen
  DiffList('A)!
  list: List('A)
  -- List('A)
end

defrule diff diffAppend
  (diff)-right (diffAppend)-right diffOpen
  (diff)-left diff
end

defrule diff diffOpen
  (diff)-right list-(diffOpen)
  (diff)-left return-(diffOpen)
end

defru diff diffAppend
  <let diff end start>
  <get end> <get diff>
  diffOpen <get start> diff
end

defru diff diffOpen
  <let list end start>
  <get list> <get end> connect
  <get start>
end
```

`wire` places the two ports of a special edge on the stack.

If a wire's two ports are connected with port `A` and `B`,
after building a net, we remove the wire, and connect `A` with `B`.

```inet
defn oneTwoSoles
  wire sole cons diff
  wire sole cons sole cons diff
  diffAppend
end

defn twoTwoSoles
  wire sole cons sole cons diff
  wire sole cons sole cons diff
  diffAppend
end
```
