---
title: Use pure postfix syntax
author: Xie Yuheng
date: 2023-08-07
---

We should use pure postfix syntax.

# Nat

Not pure postfix:

```monoid
type Nat 0 end
node zero -- value!: Nat end
node add1 prev: Nat -- value!: Nat end

node add target!: Nat addend: Nat -- return: Nat end
```

Pure postfix:

```monoid
type Nat Type end
node zero -- Nat :value! end
node add1 Nat :prev -- Nat :value! end

node add Nat :target! Nat :addend -- Nat :return end

node add
  Nat :target!
  Nat :addend
  ------------
  Nat :return
end
```

# List

Not pure postfix:

```monoid
type List 1 end
node null -- value!: List('A) end
node cons head: 'A tail: List('A) -- value!: List('A) end

node append target!: List('A) rest: List('A) -- return: List('A) end
```

Pure postfix:

```monoid
type List Type -- Type end
node null -- 'A List :value! end
node cons 'A :head 'A List :tail -- 'A List :value! end

node append 'A List :target! 'A List :rest -- 'A List :return end

node append
  'A List :target!
  'A List :rest
  --------
  'A List :return
end
```

# About JSON

When designing syntax I have a goal to be able to
write JSON directly in the language.

We should give up this goal,
because it is too limiting for new syntax design.
