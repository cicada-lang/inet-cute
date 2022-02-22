---
title: Design Syntax
---

# How to build net?

Use postfix notation to build a net.

```inet
@node Nat : {} -> { Type Principal }
@node zero : {} -> { Nat Principal }
@node add1 : {} -> { Nat Principal }
@node add : { Nat Nat Principal } -> { Nat }
```

Build a net.

```inet
@net two : {} -> { Nat } = { zero add1 zero add1 add }
```

# Type of node and net

`net` will check type according to its input and output`,

input and output will

- (A) not check anything
- (B) check net are of type-like (what is type-like)?

# How to write rule?

A rule specify how to disconnect and reconnect,
based on a matching active pair.

```inet
@rule zero <> add => {}
@rule add1 <> add => { add add1 }
```

After disconnecting, input ports are placed on the stack in order.

When a active pair is created,
how to disconnect it and place the
ports on stack is already specified.

# Examples

## K of CL

```inet
@node k0 : {} -> { t Principal }
@node k1 : { t } -> { t Principal }
@node apply : { Arg Fun Principal } -> { Ret }
```

```inet
@rule k0 <> apply => { k1 }
@rule k1 <> apply => { drop }
```

## List

```inet
@rule null <> append => {}
@rule cons <> append => { rot rot append swap cons }
```

## Circle

```inet
@node List : { Type } -> { Type Principal }
@node DiffList : { Type } -> { Type Principal }
@node diff : { A List Principal A } -> { A DiffList }
```

Use variable to store port, to build circle net.

- `wire` place its two ports on the stack.

```inet
@net _ : {} -> { A DiffList } = { wire diff }

@net _ : {} -> { Nat DiffList } = {
  wire 3 cons diff
  wire 2 cons 1 cons diff
  append
}
```
