---
title: Design of New Syntax
author: Xie Yuheng
date: 2023-07-27
---

First of all, What we need to express?
What aspects (features, relations) we need to use syntax to distinguish?

Is design of syntax like design of graphic,
where we give many choices and compare them?

```ruby
defnode zero -> !Nat end
defnode add1 prev: Nat -> !Nat end
defnode add !x: Nat y: Nat -> Nat end
```

```ruby
defnode zero -> !return: Nat end
defnode add1 prev: Nat -> !return: Nat end
defnode add !x: Nat y: Nat -> return: Nat end
```

```ruby
defru zero add end
defru add1 add add add1 end
```

```ruby
defrule zero add
  [add]-y return-[add]
end

defrule add1 add
  [add1]-prev
  [add]-y
  add add1
  return-[add]
end
```
