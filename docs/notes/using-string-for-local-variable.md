---
title: Using string for local variable
author: Xie Yuheng
date: 2023-07-28
---

We can use string to implement local variable,
to get pure postfix syntax.

```inet
defn cons append
  "head" put append
  "head" get cons
end
```
