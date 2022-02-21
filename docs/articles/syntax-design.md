---
title: Design Syntax
---

# How to build net?

Use postfix notation to build a net.

```scheme
(define Nat
  (node (input)
        (output Type Principal)))

(define zero
  (node (input)
        (output Nat Principal)))

(define add1
  (node (input)
        (output Nat Principal)))

(define add
 (node (input Nat Nat Principal)
       (output Nat)))
```

Build a net.

```scheme
(define two
  (net (input) (output Nat)
       zero add1 zero add1 add))
```

# Type of node and net

`(net)` will check type according to its `(input)` and `(output)`,

`(input)` and `(output)` will check ,

# How to write rule?

A rule specify how to disconnect and reconnect,
based on a matching active pair.

```scheme
(define-rule zero add (net))
(define-rule add1 add (net add add1))
```

After disconnecting, input ports are placed on the stack in order.

When a active pair is created,
how to disconnect it and place the
ports on stack is already specified.

# Examples

## K of CL

```scheme
(define k0 (node (input) (output t Principal)))
(define k1 (node (input t) (output t Principal)))
(define apply (node (input Arg Fun Principal) (output Ret)))
```

```scheme
(define-rule k0 apply (net k1))
(define-rule k1 apply (net drop))
```

## List

```scheme
(define-rule null append (net))
(define-rule cons append (net rot rot append swap cons))
```

## Circle

```scheme
(define List
  (node (input Type)
        (output Type Principal)))

(define DiffList
  (node (input Type)
        (output Type Principal)))

(define diff
  (node (input A List Principal A)
        (output A DiffList)))
```

Use variable to store port, to build circle net.

- `wire` place its two ports on the stack.

```scheme
(net (input) (output A DiffList)
  wire diff)

(net (input) (output Nat DiffList)
  wire 3 cons diff
  wire 2 cons 1 cons diff
  append)
```
