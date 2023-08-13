---
title: Neutral Sign
author: Xie Yuheng
date: 2023-07-30
---

To implement cut for wire,
beside positive sign (for output) and negative sign (for input),
we also need neutral sign.

A type with neutral sign can be matched with both
positive sign and negative sign, so that
a wire can be composed with both input port
and output port, then the port of the wire become the given sign
and other port of the wire become the opposite sign.

This might be an unwanted complicity,
but to avoid using neutral sign,
we need to avoid using wire,
and design new syntax to apply a node
not only in the default way
-- matching inputs and push outputs to the stack.
