---
title: Parallelization
author: Xie Yuheng
date: 2023-07-30
---

Building a net and interact a rule
are using the same context (`mod` and `net`),
but actually `interact` also has
current active edge, to support syntax
like `<edge>-(<node>)` and `(<node>)-<edge>`.

We can let `Net` has `currentActiveEdge`,
since we already can not do parallelization
because we are sharing the stack,
and JS is single thread language.

We can also make `activeEdge` and
optional argument of `Word.apply`.

To do parallelization `currentActiveEdge`
and the stack need to be context of `interact`.
