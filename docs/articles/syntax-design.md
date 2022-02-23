---
title: Design Syntax
---

# How to build net?

Use postfix notation to build a net.

```scheme
(define-node Nat (-> [] [Type Principal]))
(define-node zero (-> [] [Nat Principal]))
(define-node add1 (-> [] [Nat Principal]))
(define-node add (-> [Nat Nat Principal] [Nat]))
```

Build a net.

```scheme
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

```scheme
(define-rule [zero add] [])
(define-rule [add1 add] [add add1])
```

After disconnecting, input ports are placed on the stack in order.

When a active pair is created,
how to disconnect it and place the
ports on stack is already specified.

# Examples

## K of CL

```scheme
(define-node k0 (-> [] [t Principal]))
(define-node k1 (-> [t] [t Principal]))
(define-node apply (-> [Arg Fun Principal] [Ret]))
```

```scheme
(define-rule [k0 apply] [k1])
(define-rule [k1 apply] [drop])
```

## List

```scheme
(define-rule [null append] [])
(define-rule [cons append] [rot rot append swap cons])
```

## Circle

```scheme
(define-node List (-> [Type] [Type Principal]))
(define-node DiffList (-> [Type] [Type Principal]))
(define-node diff (-> [A List Principal A] [A DiffList]))
```

Use variable to store port, to build circle net.

- `wire` place its two ports on the stack.

```scheme
(define-net _ (-> [] [A DiffList])
  [wire diff])

(define-net _ (-> [Nat] [DiffList])
  [wire 3 cons diff
   wire 2 cons 1 cons diff
   append])
```
