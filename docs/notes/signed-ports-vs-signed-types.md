---
title: Signed Ports v.s. Signed Types
author: Xie Yuheng
date: 2023-07-31
---

In the "Interaction Nets" paper,
Yves Lafont used signed types instead of signed ports.

In our implementation we use signed ports (input or output),
instead of signed types (types are kept simple).

For type checking the two ways are the same,
because if we use signed types, when defining a node,
the signs of its ports are given by the types staticly.
