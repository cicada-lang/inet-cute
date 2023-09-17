---
title: Try prefix expression
author: Xie Yuheng
date: 2023-09-17
---

Postfix expression:

```
rule zero add
  (add)-addend
  return-(add)
end

rule add1 add
  (add)-addend
  (add1)-prev add
  add1 return-(add)
end
```

Prefix expression:

```
rule zero add {
  @connect(^add->addend, ^add->return)
}

rule add1 add {
  @connect(
    add1(add(^add1->prev, ^add->addend)),
    ^add->return,
  )
}
```
