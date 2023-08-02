---
title: defdata
author: Xie Yuheng
date: 2023-08-02
---

We can use `defdata` to `deftype` and `defnode` (constructor) together.

# Nat

Instead of

```inet
deftype Nat 0 end
defnode zero -- value!: Nat end
defnode add1 prev: Nat -- value!: Nat end
```

We can write

```inet
defdata Nat
  zero -- value!: Nat end
  add1 prev: Nat -- value!: Nat end
end
```

# List

Instead of

```inet
deftype List 1 end
defnode  null -- value!: List('a) end
defnode  cons head: 'a, tail: List('a) -- value!: List('a) end
```

We can write

```inet
defdata List('a)
  null -- value!: List('a) end
  cons head: 'a, tail: List('a) -- value!: List('a) end
end
```

Maybe we can use `a` instead of `'a`,
because `defdata List(a)` introduces `a` into the scope.

But the eliminator like `append` still need to use `'a`.

```inet
defdata List(a)
  null -- value!: List('a) end
  cons head: a, tail: List(a) -- value!: List(a) end
end
```
