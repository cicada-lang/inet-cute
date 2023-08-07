---
title: An information analysis of dependent type system
author: Xie Yuheng
date: 2023-08-08
---

In a dependent type system, we have

```
check(ctx: Ctx, exp: Exp, t: Type)
```

The total information of `exp` is available to `check`.

But for our `cut`, it is actually `infer` + `compose`.

After `infer` the first level of information of a word is not available anymore,
only the second level of the information of the word is available.

This is why we can not have dependent type system for current design of `cut`.

# Type checking for interaction nets

Type checking for interaction nets can actually be simpler.

We do NOT need to implement a function like `check`,
or implement `cut` as `infer` + `compose`.

We simply check the type of the ports
when we are building a net.

In inet, we can build a net without running it!

# Partial evaluation

Dependent type system need to perform partial evaluation
to check equivalent of two functions.

Partial evaluation is trivial for interaction net!
