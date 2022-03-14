---
title: Notes about Interaction Nets
---

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

```clojure
(define-node <node>
  (-> [<input-port> ...]
      [<output-port> ...]))
```

A node has one **principal port**,
which might be input port or output port.

We distinguish two kinds of nodes

- **constructor**, whose principal port is its last output ports.
- **eliminator**, whose principal port is its last input ports.

Using this convention,
we do not need to label
which port is principal port.

```clojure
(define-constructor <node>
  (-> [<input-port> ...]
      [<output-port> ...]))

(define-eliminator <node>
  (-> [<input-port> ...]
      [<output-port> ...]))
```

# Type

A type has a unique name and a arity.

# Building nets

We use *postfix notation* to build nets
with the help of *a stack of ports*.

When we call a node,
it connects its input ports to ports on the stack,
meanwhile consuming them,
then it put its output ports back to the stack.

# Rule

A rule specifies
how to disconnect two nodes (active pair)
and reconnect them.

After disconnecting, we put input ports back to the stack.

- A convention is used to help specify how to do this.

# Examples

## Nat

```clojure
(define-type Nat 0)

(define-constructor zero (-> [] [Nat]))
(define-constructor add1 (-> [Nat] [Nat]))

(define-eliminator add (-> [Nat Nat] [Nat]))

(define-rule [zero add] [])
(define-rule [add1 add] [add add1])

(define-net two (-> [] [Nat])
  zero add1 zero add1 add)
```

## List

```clojure
(define-type Trivial 0)

(define-constructor sole (-> [] [Trivial]))

(define-type List 1)

(define-constructor null
  (forall (A)
    []
    [A List]))

(define-constructor cons
  (forall (A)
    [A List, A]
    [A List]))

(define-eliminator append
  (forall (A)
    [A List, A List]
    [A List]))

(define-rule
  [null append]
  [])

(define-rule
  [cons append]
  [rot rot append swap cons])

(define-rule
  [that tail head cons append]
  [that tail append head cons])

(define-net six-soles (forall (A) [] [A List])
  null sole cons sole cons sole cons
  null sole cons sole cons sole cons
  append)
```

## DiffList

```clojure
(define-type DiffList 1)

(define-constructor diff
  (forall (A)
    [A List, A List]
    [A DiffList]))

(define-eliminator diff-append
  (forall (A)
    [A DiffList, A DiffList]
    [A DiffList]))

(define-eliminator diff-open
  (forall (A)
    [A List, A DiffList]
    [A List]))

(define-rule
  [that left right diff diff-append]
  [left that diff-open right diff])

(define-rule
  [that left right diff diff-open]
  [that left connect right])
```

`wire` places the two ports of an edge on the stack.

```clojure
(define-net _ (forall (A) [] [A DiffList])
  wire diff)

(define-net _ (forall (A) [] [A DiffList])
  wire sole cons diff
  wire sole cons sole cons diff
  diff-append)
```
