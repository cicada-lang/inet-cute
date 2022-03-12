---
title: Notes about Interaction Nets
---

Interaction Nets is a study of typed undirected graphs,
and using them to model computations.

A graph is typed, in the sense that
each node has fixed numebr of typed ports,
when connecting two nodes by an edge,
ports on these nodes will be consumed,
and the type of ports must matches.

A node's ports are split into two lists, input ports and output ports.

```inet
(define-node <node>
  (-> [<input-port> ...]
      [<output-port> ...]))
```

A node has one principal port, which might be input port or output port.

We distinguish two kinds of nodes

- constructor, whose principal port is its last output ports.
- eliminator, whose principal port is its last input ports.

Using this convention, we do not need to label which port is principal port.

```inet
(define-constructor <node>
  (-> [<input-port> ...]
      [<output-port> ...]))

(define-eliminator <node>
  (-> [<input-port> ...]
      [<output-port> ...]))
```
