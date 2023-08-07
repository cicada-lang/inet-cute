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

# Introduction to interaction nets

A _net_ is a (maybe typed) undirected graph.
in which a node has a fixed numebr of (typed) _ports_.

When we want to connect two nodes by an edge,
the connection must go through the ports of the nodes,
(and if typed, the types of the ports must match with each other).

One connection will consume two ports.

We can use _rules_ to specify interactions between nodes.

First we need some constraints:

- A node's ports are split into two lists -- _input ports_ and _output ports_.
- A node has one _principal port_, which might be in input ports or in output ports.

If two nodes are connected through their principal ports (a.k.a. active pair),
we can write a _rule_ to specify how to disconnect these two nodes
and reconnect them, during the reconnection we might add new nodes and edges.

> **Documentation work in progress.**

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

A node has a name.

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

```monoid pseudocode
constructor <node>
  <input-port> ...
  ------
  <output-port> ...
end


eliminator <node>
  <input-port> ...
  ------
  <output-port> ...
end
```

# Session types

According to on Frank Pfenning's works,
additive connectives of linear logic should be viewed as
concurrency by message passing via channel.

A linear logic proposition can be viewed the type of a channel.

- **[problem]** Is alternative understanding of additive connectives possible?

  - The additive conj -- `with` -- like `times` but can do projection only once?
  - The additive disj -- `plus` -- maybe need new primitive operator about parallelism.

# Type

A type has a name and an arity.

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

```monoid
type Nat -- Type end

constructor zero -- Nat end
constructor add1 Nat -- Nat end
eliminator add Nat Nat -- Nat end

rule zero add end
rule add1 add
  add add1
end

claim two -- Nat end
define two
  zero add1
  zero add1
  add
end
```

## Trivial

```monoid
type Trivial -- Type end
constructor sole -- Trivial end
```

## List

```monoid
constructor null
  vague (A: Type)
  ------
  A List
end

constructor cons
  vague (A: Type)
  A A List
  ------
  A List
end

eliminator append
  implicit (A: Type)
  A List A List
  ------
  A List
end

rule null append end

rule cons append
  rot rot append swap cons
end

rule cons append
  let (that, tail, head)
  that tail append head cons
end

rule cons append
  let (head) let (tail) let (that)
  that tail append head cons
end

rule cons append
  let (head) append head cons
end

claim six-soles -- Trivial List end

define six-soles
  null sole cons sole cons sole cons
  null sole cons sole cons sole cons
  append
end
```

## Vector

```monoid
type Vector Type Nat -- Type end

constructor null-vector
  vague (A: Type)
  ------
  zero A Vector
end

constructor cons-vector
  vague (A: Type, prev: Nat)
  A, prev A Vector
  ------
  prev add1 A Vector
end

eliminator vector-append
  implicit (A: Type, y: Nat)
  y A Vector
  implicit (x: Nat)
  x A Vector
  ------
  x y add A Vector
end

rule null-vector vector-append end

rule cons-vector vector-append
  let (head) vector-append head cons-vector
end

check
  six Trivial Vector
then
  null-vector sole cons-vector sole cons-vector sole cons-vector
  null-vector sole cons-vector sole cons-vector sole cons-vector
  vector-append
end
```

## DiffList

```monoid
// |- ~List(A), ~List(A), DiffList(A)

constructor diff
  vague (A: Type)
  A List A List
  ------
  A DiffList
end
```

```monoid
type DiffList Type -- Type end

constructor diff
  vague (A: Type)
  A List A List
  ------
  A DiffList
end

eliminator diff-append
  implicit (A: Type)
  A DiffList
  A DiffList
  ------
  A DiffList
end

eliminator diff-open
  implicit (A: Type)
  A DiffList
  A List
  ------
  A List
end

rule diff diff-open
  let (that, left, right)
  that left connect right
end

rule diff diff-append
  let (that, left, right)
  left that diff-open right diff
end
```

`wire` places the two ports of a special edge on the stack.

If a wire's two ports are connected with port `A` and `B`,
after building a net, we remove the wire, and connect `A` with `B`.

```monoid
check
  Trivial DiffList
then
  wire diff
end

check
  Trivial DiffList
then
  wire sole cons diff
  wire sole cons sole cons diff
  diff-append
end
```
