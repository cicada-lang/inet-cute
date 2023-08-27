---
title: dependent type system
author: Xie Yuheng
date: 2023-08-08
---

Simple type system is easy to implement,
how about dependent type system?

If we can implement equality between `Net`s,
we can use `Net` as value.

# An information analysis of dependent type system

In a dependent type system, we have

```
check(ctx: Ctx, exp: Exp, t: Type)
```

The total information of `exp` is available to `check`.

But for our `cut`, it is actually `infer` + `compose`.

One word has two levels of information.

After `infer` the first level of information of a word is not available anymore,
only the second level of the information of the word is available.

This is why we can not have dependent type system
for the current design -- a design using `cut`.

# Type checking for interaction nets

Type checking for interaction nets can actually be simpler.

We do NOT need to implement a function like `check`,
or implement `cut` as `infer` + `compose`.

We can simply do type checking by building the net,
when connecting two ports during building the net,
check the signs of the two ports
and unify the types of the two ports.

Remember, in inet, we can build a net without running it!

In type system of normal language,
type checking happens during building the syntax tree.
In inet, the net is the syntax,
type checking happens during building the net.

# Type checking of rules

Type checking of `rule` can obviously be done by building the local net.

# Type checking of word definitions

Type checking of `claim` and `define` can also be done by
first preparing some input ports on the stack
then building the local net.

Because every port is of some node,
thus to prepare ports, we need to introduce nodes.

We can introduce single-port nodes from types,
where will be no rules defined for such nodes,
they are not interactive, merely placeholders.

# Partial evaluation

Dependent type system need to perform partial evaluation
to check equivalent of two functions.

Partial evaluation is trivial for inet!

# Conclusion

We do not need `cut`, we can just check the words by building the net.

This means we will have a dynamicly typed (or simply typed)
postfix general programming language
as a macro system.
