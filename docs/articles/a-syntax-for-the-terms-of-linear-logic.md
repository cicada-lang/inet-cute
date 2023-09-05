---
title: A Syntax for The Terms of Linear Logic
subtitle: Also a Syntax for Building Interaction Nets
author: Xie Yuheng
date: 2022-05-06
keywords: [Sequent Calculus, Linear Logic, Interaction Nets, Syntax Design]
---

**WORD IN PROGRESS**

# Ordered cut rule

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

- Note that, we are can still use exchange rule,
  we just have to use them explicitly.
  And we should use exchange rule
  to order the sequent before a cut.

```
|- Γ, A1, ..., An
|- ~A1, ..., ~An, Δ
-------------------- cut
|- Γ, Δ
```

# Interaction nets

A _net_ is a undirected graph.
in which a node has a fixed numebr of typed _ports_.

When we want to connect two nodes by an edge,
the connection must go through the ports of the nodes,
and the types of the ports must match with each other.

One connection will consume two ports.

We can use _rules_ to specify interactions between nodes.

First we need some constraints:

- A node's ports are split into two kinds -- _input ports_ and _output ports_.
- A node has one _principal port_, which might be in input ports or in output ports.

If two nodes are connected through their principal ports (a.k.a. active edge),
we can write a _rule_ to specify how to disconnect these two nodes
and reconnect them, during the reconnection we might add new nodes and edges.

[Interaction nets](https://en.wikipedia.org/wiki/Interaction_nets)
studies how to use interaction
between nodes of net
to model computations.

# Node and Port

A node has a name.

A node's ports are split into two lists,
_input ports_ and _output ports_.

A node has one **principal port**,
which might be input port or output port.

We can distinguish two kinds of nodes:

- **Constructor**, whose principal port is its last output ports.
- **Eliminator**, whose principal port is its first input ports.

# Session types

According to on Frank Pfenning's works,
additive connectives of linear logic should be viewed as
concurrency by message passing via channel.

A linear logic proposition can be viewed as the type of a channel.

**[problem]** Is an alternative understanding of additive connectives possible?

- The additive conj -- `with` -- like `times` but can do projection only once?
- The additive disj -- `plus` -- maybe need new primitive operator about parallelism.

# Building nets

We use _postfix notation_ to build nets
with the help of _a stack of ports_.

When we call a node,
it connects its input ports to ports on the stack,
and consumes them,
then it puts its output ports back to the stack.

# Rule

A rule specifies
how to disconnect two nodes (active edge)
and reconnect them.

After disconnecting, we put input ports back to the stack.

# TODO
