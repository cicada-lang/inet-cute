---
title: Refactor the syntax of rearrange to literal node and spread
author: Xie Yuheng
date: 2023-09-13
---

To construct `DiffList`, I previously design a syntax
to rearrange a node's port before applying it.

Before rearrange:

```
   return
     |
   (cons)
   /   \
head   tail
```

after rearrange by `(cons :tail)`,
the port `tail` will be changed
from an input position to an output position
(it is still an input port).

```
 tail  return
    \  /
   (cons)
     |
    head
```

Example usage to construct `DiffList`:

```
zero (cons :tail) zero cons diff $value @connect value
zero (cons :tail) zero cons diff $value @connect value
diffAppend
```

Now the syntax of rearrange is removed,
and I use `(node)` to create a node,
and `@spread` to get all it's ports.

```
(diff) @spread $front $back $value
back zero cons zero cons front @connect value
(diff) @spread $front $back $value
back zero cons zero cons front @connect value
diffAppend

// use less variables:

(diff) @spread $front $back
back zero cons zero cons front @connect
(diff) @spread $front $back
back zero cons zero cons front @connect
diffAppend

// use less variables:

(diff) @spread $front zero cons zero cons front @connect
(diff) @spread $front zero cons zero cons front @connect
diffAppend
```
