---
title: Introduction
---

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
