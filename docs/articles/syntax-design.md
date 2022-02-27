---
title: Design Syntax
---

# How to build net?

Use postfix notation to build a net.

```inet
(define-node Nat (-> [] [Type *]))
(define-node zero (-> [] [Nat *]))
(define-node add1 (-> [] [Nat *]))
(define-node add (-> [Nat Nat *] [Nat]))
```

Build a net.

```inet
(define-net two (-> [] [Nat])
  [zero add1 zero add1 add])
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
(define-rule [zero add] [])
(define-rule [add1 add] [add add1])
```

After disconnecting, input ports are placed on the stack in order.

When a active pair is created,
how to disconnect it and place the
ports on stack is already specified.

# Examples

## K of CL

```inet
(define-node k0 (-> [] [t *]))
(define-node k1 (-> [t] [t *]))
(define-node apply (-> [Arg Fun *] [Ret]))
```

```inet
(define-rule [k0 apply] [k1])
(define-rule [k1 apply] [drop])
```

## List

```inet
(define-rule [null append] [])
(define-rule [cons append] [rot rot append swap cons])
```

## Circle

```inet
(define-node List (-> [Type] [Type *]))
(define-node DiffList (-> [Type] [Type *]))
(define-node diff (-> [A List * A] [A DiffList]))
```

Use variable to store port, to build circle net.

- `wire` place its two ports on the stack.

```inet
(define-net _ (-> [] [A DiffList])
  [wire diff])

(define-net _ (-> [Nat] [DiffList])
  [wire 3 cons diff
   wire 2 cons 1 cons diff
   append])
```
