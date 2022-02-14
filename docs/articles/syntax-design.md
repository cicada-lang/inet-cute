---
title: Design Syntax
---

# How to build net?

Use postfix notation to build a net.

```cicada-vm
node zero [ -> Nat * ]
node add1 [ Nat -> Nat * ]
node add [ Nat Nat * -> Nat ]
```

Build a net.

```cicada-vm
net two [ -> Nat ] {
  zero add1 zero add1 add
}
```

# How to write rule?

A rule specify how to disconnect and reconnect,
based on a matching active pair.

```cicada-vm
rule [ zero add => ]
rule [ case add1 add => add add1 ]
```

After disconnecting, input ports are placed on the stack in order.

When a active pair is created,
how to disconnect it and place the
ports on stack is already specified.

# Examples

## K of CL

``` cicada-vm
node k0 [ -> t * ]
node k1 [ t -> t * ]
node apply [ Arg Fun * -> Ret ]
```

```cicada-vm
rule [ k0 apply => k1 ]
rule [ k1 apply => drop ]
```

## Circle

```cicada-vm
node diff [ A List * A -> A DiffList ]
```

Use variable to store port, to build circle net.

- `wire` place its two ports on the stack.

```cicada-vm
net {
  wire diff
}

net {
  wire 3 cons diff
  wire 2 cons 1 cons diff
  append
}
```

## Why we need stack-based syntax

In non stack-based syntax,
handling multiple return values will be unnatural.

```js
let x = wire

diff(x, x)
```

```js
let x = wire
let y = wire

append(
  diff(cons(1, cons(2, x)), x)
  diff(cons(3, y), y))
```
