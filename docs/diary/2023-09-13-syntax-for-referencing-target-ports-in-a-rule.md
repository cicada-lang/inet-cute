---
title: Syntax for referencing target ports in a rule
author: Xie Yuheng
date: 2023-09-13
---

In the definition of a rule:

```
rule add1 add
  (add)-addend
  (add1)-prev add
  add1 return-(add)
end
```

We need to reference the target ports of the two target nodes.

I used `(node)-port` to push a port to the stack,
and `port-(node)` to connect a port to the top port in the stack.

This is because in the ASCII art of rule:

```
     return          value
       |               |
     (add)     =>    (add1)
     /   \             |
(add1)   addend      (add)
  |                  /   \
prev            target   addend
```

Connection is written as:

```
(add)--(add1)
```

If we also write the port names, we get:

```
(add)-target return-(add1)
```

This format is also used to print an edge.

# Ad-hoc-ness of this syntax

The `(node)-port` and `port-(node)` syntax feels ad-hoc, because

- They can only be used in the definition of a rule.
- `(node)-port` is viewed as a whole, not `(node)` and `-port`.
- `(node)-port` does not represent a port of `(node)`,
  but represents a port that is exposed by removing `(node)`,
  this might be confusing.

# The semantic as a linear store

The semantic of `(node)-port` and `port-(node)`,
is like fetching value out of a linear store.

Linear, because once a value is fetched, it is consumed,
and can not be fetched again.
