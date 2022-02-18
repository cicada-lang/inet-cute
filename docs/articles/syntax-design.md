---
title: Design Syntax
---

# How to build net?

Use postfix notation to build a net.

```cicada-vm
(define-node zero [] [Nat *])
(define-node add1 [Nat] [Nat *])
(define-node add [Nat Nat *] [Nat])

(define zero (node [] [Nat *]))
(define add1 (node [Nat] [Nat *]))
(define add (node [Nat Nat *] [Nat]))
```

Build a net.

```cicada-vm
(define-net two [] [Nat]
  zero add1 zero add1 add)

(define two
  (nat [] [Nat]
    zero add1 zero add1 add))
```

# How to write rule?

A rule specify how to disconnect and reconnect,
based on a matching active pair.

```cicada-vm
(define-rule [zero add] [])
(define-rule [add1 add] [add add1])
```

After disconnecting, input ports are placed on the stack in order.

When a active pair is created,
how to disconnect it and place the
ports on stack is already specified.

# Examples

## K of CL

```cicada-vm
(define-node k0 [] [t *])
(define-node k1 [t] [t *])
(define-node apply [Arg Fun *] [Ret])
```

```cicada-vm
(define-rule [k0 apply] [k1])
(define-rule [k1 apply] [drop])
```

## List

```cicada-vm
(define-rule [null append] [])
(define-rule [cons append] [rot rot append swap cons])

(set-rule! (rule [null append] []))
(set-rule! (rule [cons append] [rot rot append swap cons]))
```

## Circle

```cicada-vm
(define diff (node [A List * A] [A DiffList]))
```

Use variable to store port, to build circle net.

- `wire` place its two ports on the stack.

```cicada-vm
(net wire diff)

(net
  wire 3 cons diff
  wire 2 cons 1 cons diff
  append)
```
