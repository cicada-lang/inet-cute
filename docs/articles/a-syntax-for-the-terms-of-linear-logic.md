---
title: A Syntax for The Terms of Linear Logic
subtitle: A Syntax for Building Interaction Nets
author: Xie Yuheng
date: 2022-05-06
keywords: [Sequent Calculus, Linear Logic, Interaction Nets, Syntax Design]
---

# Abstract

By syntax, I mean expression implemented by syntax tree, not graph
(if we use graph, we can draw interaction nets directly).

And I use "syntax" as a countable noun syntaxes

# TODO V.S. The Linear Abstract Machine

# TODO Cut rule

In sequent calculus of linear logic,
we have the exchange rule,
and when writing the cut rule (and other rules),
it is assumed that the order does not matter.

The key of our design is to limit the use of cut rule,
to make the order matters,
i.e. one can apply the cut rule
only when the following pattern is matched:

- Where `A1` and ... and `An` are not negation,
  and atoms in both `Γ` and `Δ` are not negation.

- Note that, we are still free to use exchange rule,
  and we should use exchange rule, to order the sequent before a cut.

```
|- Γ, A1, ..., An
|- ~A1, ..., ~An, Δ
-------------------- cut
|- Γ, Δ
```

# Net -- typed undirected graph

A net is a typed undirected graph.

A graph is typed, if each node has fixed numebr of typed ports.

One connection consumes two ports.

When we want to connect two nodes by an edge,
the connection must go through the ports of the nodes,
and the types of the ports must match with each other.

> [Interaction nets](https://en.wikipedia.org/wiki/Interaction_nets)
> studies how to use interaction
> between nodes of net
> to model computations.

# Node and its ports

A node has a unique name.

A node's ports are split into two lists,
_input ports_ and _output ports_.

A node has one **principal port**,
which might be input port or output port.

We distinguish two kinds of nodes

- **Constructor**, whose principal port is its last output ports.
- **Eliminator**, whose principal port is its first input ports.

Using this convention,
we do not need to label
which port is principal port.

```inet pseudocode
constructor <node> {
  <input-port> ...
  ------
  <output-port> ...
}


eliminator <node> {
  <input-port> ...
  ------
  <output-port> ...
}
```

# Type

A type has a unique name and an arity.

# Building nets

We use _postfix notation_ to build nets
with the help of _a stack of ports_.

When we call a node,
it connects its input ports to ports on the stack,
and consumes them,
then it puts its output ports back to the stack.

# Rule

A rule specifies
how to disconnect two nodes (active pair)
and reconnect them.

After disconnecting, we put input ports back to the stack.

# Examples

## Nat

```inet
type Nat { -- Type }

constructor zero { -- Nat }
constructor add1 { Nat -- Nat }
eliminator add { Nat Nat -- Nat }

rule zero add {}
rule add1 add {
  add add1
}

claim two { Nat }
define two {
  zero add1
  zero add1
  add
}
```

## Trivial

```inet
type Trivial { -- Type }
constructor sole { -- Trivial }
```

## List

```inet
constructor null {
  vague (A: Type)
  ------
  A List
}

constructor cons {
  vague (A: Type)
  A A List
  ------
  A List
}

eliminator append {
  implicit (A: Type)
  A List A List
  ------
  A List
}

rule null append {}

rule cons append {
  rot rot append swap cons
}

rule cons append {
  let (that, tail, head)
  that tail append head cons
}

rule cons append {
  let (head) let (tail) let (that)
  that tail append head cons
}

rule cons append {
  let (head) append head cons
]

claim six-soles { Trivial List }

define six-soles {
  null sole cons sole cons sole cons
  null sole cons sole cons sole cons
  append
}
```

## Vector

```inet
type Vector { Type Nat -- Type }

constructor null-vector {
  vague (A: Type)
  ------
  zero A Vector
}

constructor cons-vector {
  vague (A: Type, prev: Nat)
  A, prev A Vector
  ------
  prev add1 A Vector
}

TODO

(eliminator vector-append
  (implicit ((A Type) (y Nat)))
  (- y A Vector)
  (implicit ((x Nat)))
  (- x A Vector)
  x y add A Vector)

(rule (null-vector vector-append))

(rule (cons-vector vector-append)
  (let head) vector-append head cons-vector)

(check-net (six Trivial Vector)
  null-vector sole cons-vector sole cons-vector sole cons-vector
  null-vector sole cons-vector sole cons-vector sole cons-vector
  vector-append)
```

## DiffList

```inet
// |- ~List(A), ~List(A), DiffList(A)

claim diff {
  vague (A: Type)
  A List A List
  ------
  A DiffList
}
```

```clojure
(type DiffList (- Type) Type)

(constructor diff
  (vague ((A Type)))
  (- A List) (- A List)
  A DiffList)

(eliminator diff-append
  (implicit ((A Type)))
  (- A DiffList)
  (- A DiffList)
  A DiffList)

(eliminator diff-open
  (implicit ((A Type)))
  (- A DiffList)
  (- A List)
  A List)

(rule (diff diff-open)
  (let that left right)
  that left connect right)

(rule (diff diff-append)
  (let that left right)
  left that diff-open right diff)
```

`wire` places the two ports of a special edge on the stack.

If a wire's two ports are connected with port `A` and `B`,
after building a net, we remove the wire, and connect `A` with `B`.

```clojure
(check-net (Trivial DiffList)
  wire diff)

(check-net (Trivial DiffList)
  wire sole cons diff
  wire sole cons sole cons diff
  diff-append)
```
