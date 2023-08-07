---
title: Type System as Homomorphism between Monoids
author: Xie Yuheng
date: 2022-05-06
keywords: [Sequent Calculus, Linear Logic, Syntax Design, Monoid]
---

# Abstract

We demonstrate how to view a type system as a homomorphism between two monoids,
where the space of types is monoid, the space of terms is also a monoid,
and the homomorphism is the `infer` function of the type system.

We use a concrete example to demonstrate this idea,
in our example the space of types is a space of _linear logic propositions_,
and the space of terms is a space of _concatenative programs_.

The space of concatenative programs is inspired by
the Forth programming language.

Some key points of our demonstration:

- Negation of linear logic should NOT be interpreted as "implying false",
  but be interpreted as a type of _linear assignment_ (thus constructive).

- Linear logic additive connectives can be interpreted without concurrency.

- Type errors will be captured by a special `Error` element.

# Introduction

Firstly, a homomorphism between two monoids can be viewed as a type system.
We can view this homomorphism as the `infer` function,
given a term it can infer the type of this term.

We say a "type system", because of
the principle of type theory is

> To study **terms** and **types** together.

and a homomorphism allow us to study the two monoids together.

The reverse is also true, given a type system,
we can construct two monoids to be the space of terms and types.
And we can interpret concepts in type system as equations in monoid.

# Example: A syntax for the terms of linear logic

Let's define two concrete monoids and a homomorphism between them,
to see the idea of this paper in action.

We call the homomorphism `infer`,
it's domain is the space of **terms**,
it's codomain is the space of **types**.

The types will be _linear logic propositions_.

The terms will be _[concatenative programs](https://en.wikipedia.org/wiki/Concatenative_programming_language)_
(like programs in the [Forth](<https://en.wikipedia.org/wiki/Forth_(programming*language)> language)
and the [Joy](<https://en.wikipedia.org/wiki/Joy*(programming*language)>) language).

We use whitespace as infix notation
to denote the binary operation
of the monoids (instead of using an explicit infix notation like `•`).

If `x` and `y` are elements, so is `x y`.

Since `infer` is a homomorphism, we have:

```
infer(x y) = infer(x) infer(y)
```

## The plan

Our plan is to take two free monoids of symbols as base monoids to start with.

Then we define ways to construct new elements in these two monoids,
meanwhile refine the definition of `infer` for these new elements.

And we refine the base monoids to be not just any symbols,
but symbols introduced by datatype definitions.

## Two free monoids of symbols and a trivial homomorphism

A element of **the monoid of terms** is a list of symbols,
chosen from the first four lower case latin alphabets -- `a, b, c, d`,
such as:

- `a`
- `a b`
- `a b b a`
- `a c d c`

A element of **the monoid of types** is a list of symbols,
chosen from the first four upper case latin alphabets -- `A, B, C, D`,
such as:

- `A`
- `A B`
- `A B B A`
- `A C D C`

The empty list is the **identity element** of both monoids,
for convenience we also explicitly write them as `empty` and `Empty` in equations.

And we define the `infer` to be the trivial homomorphism
from lower case words to capitalized words,
for examples:

```
infer(a) = A
infer(a b) = infer(a) infer(b) = A B
infer(empty) = Empty
```

## Abstraction of both term and type

If `x` is a term, so is `{ x }`.

If `X` is a type, so is `{ X }`.

- We call this way of constructing new elements **abstraction**.

We refine the definition of `infer` for abstraction:

```
infer({ x }) = { infer(x) }
```

In the monoid of terms, we introduce a postfix operator `apply`
to denote application of abstraction.

We then introduce the following equivalent relation
for elements constructed by abstraction.

**Abstraction of term can be applied:**

```
{ x } apply = x
```

Note that `apply` is only defined for terms, but not for types.

## Linear assignment of term, and negation of type

If `X` is a type, `let (x: X) ... x ...` is a term.

- We call this way of constructing new terms **linear assignment**,
  it is linear in the sense that an assigned variable
  must be referenced once and only once.

If `X` is a type, `X neg` is also a type.

- We call this way of constructing new types **negation**.

  Note that this is NOT `X`'s inverse element in the monoid,
  but only a _postfix notation_ to construct new element
  (If we really can get the inverse element of any element,
  we will be working within group instead of monoid).

We refine the definition of `infer` for linear assignment and negation:

```
infer(let (x: X) ... x ...) = X neg infer(...) X infer(...)
```

i.e. negation is the type of linear assignment.

For example:

```
infer(let (x: A) b x c) = A neg B A C
```

We then introduce the following equivalent relation
for elements constructed by linear assignment and negation.

**Linear assignment can take the left term and substitute it into the place of reference:**

```
y let (x: X) ... x ... = ... y ...
```

**Negation cancels an type from the right side:**

```
X X neg = Empty
```

**Negation is involutive:**

```
X neg neg = X
```

We introduce a syntactic shorthand for writing negation in `{ ... }`,

```
{ X -- Y }
```

is the same as

```
{ X neg Y }
```

For example:

```
infer({ let (x: A) b x c }) = { A -- B A C }
```

## Datatype definition

At the beginning, we took the free monoid of symbols as our base monoids,
we did this only to introduce new concepts step by step.
Now it is time to refine these base monoids.

We used to use `a, b, c, d` as generaters of the monoid of terms,
and `A, B, C, D` as generaters of the monoid of types,
we abandon them from now on.

And we switch to a system where
only symbols defined by `datatype` keyword
are generaters of our monoids.

An exmaple of datatype definition is the following:

```
datatype Nat {
  zero { -- Nat }
  add1 { Nat -- Nat }
}
```

After this definition:

- `Nat` is a type.
- `Nat.zero` is a term.
- `Nat.add1` is a term.

We say `Nat` is a **type constructor**,
and `Nat.zero` and `Nat.add1` are two **data constructors**.

The datatype definition also defines the homomorphism for between elements:

```
infer(Nat.zero) = Nat
infer(Nat.add1) = Nat neg Nat
```

## Global variable definition

We can use the `claim` keyword to claim a global variable's type
and the `define` keyword to define a global variable's term.

- A variable introduced by linear assignment is called "local variable" (or "bound variable"),
  and a global variable (or say free variable) is different from them.

```
claim one { Nat }
define one { Nat.zero Nat.add1 }

claim two { Nat }
define two { one Nat.add1 }
```

We infer the type of defined term,
to check whether the inferred type is equal to the claimed type.

Our definition of `one` passes this type check.

```
infer(one) =
infer(Nat.zero Nat.add1) =
infer(Nat.zero) infer(Nat.add1) =
Nat Nat neg Nat =
Nat
```

Our definition of `two` also passes this type check.

```
infer(two) =
infer(one Nat.add1) =
infer(Nat.zero Nat.add1 Nat.add1) =
infer(Nat.zero) infer(Nat.add1) infer(Nat.add1) =
Nat Nat neg Nat Nat neg Nat =
Nat
```

## Matching of term

We can use `match` to construct a term against a given datatype.

```
match (<type>) {
  <data-constructor> { ... }
  <data-constructor> { ... }
  ...
}
```

We must also define `infer` for `match`:

```
infer(match (<type>) {
  <data-constructor> { ... }
  <data-constructor> { ... }
  ...
}) = <type> neg unify_types(
  return_type_of(<data-constructor>) infer(...),
  return_type_of(<data-constructor>) infer(...),
  ...,
)
```

Suppose we define `unify_types` as function
which unifies all its arguments with each other, and return the unified type.

If the unification failed, it will return a special element in the monoid of types -- `Error`.

- Complete definition of the unification will explained in the following sections.

The equivalent relation for `Error` is

```
X Error = Error
Error X = Error
```

We then introduce the following equivalent relation
for elements constructed by `match`.

```
x match (<type>) {
  <data-constructor> { ... }
  <data-constructor> { ... }
  ...
} = assert_types(infer(x), <type>) match_data(x, { ... }, { ... }, ...)
```

We define `assert_types` as a function the same as `unify_types` by return `Empty`.

And we define `match_data` as a function

- If its first term is NOT end with one of the given data constructors,
  it returns `error`;
- If its first term ends with one of the given data constructors,
  it remove the ending data constructor
  and compose the remaining term with the term in the matching clause.

the equivalent relation for `error` is

```
x error = error
error x = error
```

We can use `match` to define addition for `Nat`.

```
claim add { Nat Nat -- Nat }
define add {
  match (Nat) {
    zero {}
    add1 { add Nat.add1 }
  }
}
```

Type check:

```
infer(
  match (Nat) {
    zero {}
    add1 { add Nat.add1 }
  }
) = Nat neg unify_types(infer(empty), Nat infer(add Nat.add1)) =
Nat neg unify_types(Empty, Nat infer(Nat neg Nat neg Nat Nat neg Nat)) =
Nat neg unify_types(Empty, Nat Nat neg Nat neg Nat Nat neg Nat) =
Nat neg unify_types(Empty, Nat neg Nat) =
Nat neg Nat neg Nat
```

In the example above we see `unify_types(Empty, Nat neg Nat) = Nat neg Nat`.

Example computation of `add`:

```
one one add =
one Nat.zero Nat.add1 match (Nat) {
  zero {}
  add1 { add Nat.add1 }
} = one Nat.zero add Nat.add1
```

In the above step, we see `one Nat.zero Nat.add1` ends with `Nat.add1`,
thus the second clause is a match,
we remove the ending `Nat.add1`,
and compose the remaining `one Nat.zero`
with the term in the match clause -- `add Nat.add1`.

```
one Nat.zero add Nat.add1 =
one Nat.zero match (Nat) {
  zero {}
  add1 { add Nat.add1 }
} Nat.add1 = one Nat.add1
```

In the above step, we see `one Nat.zero` ends with `Nat.zero`,
thus the first clause is a match,
we remove the ending `Nat.zero`,
and compose the remaining `one`
with the term in the match clause -- `empty`.

We can also view the above definition of `add` by `match`,
as adding a new term (`add`) to the monoid of terms,
and adding the following two equations:

```
Nat.zero add = empty;
Nat.add1 add = add Nat.add1;
```

If we infer the left hand side and the right hand side
of the first equation, we will see the resulting types
unify with each other.

```
infer(Nat.zero add) =
Nat Nat neg Nat neg Nat =
Nat neg Nat

infer(empty) =
Empty
```

The same is true for the second equation.

```
infer(Nat.add1 add) =
Nat neg Nat Nat neg Nat neg Nat =
Nat neg Nat neg Nat

infer(add Nat.add1) =
Nat neg Nat neg Nat Nat neg Nat =
Nat neg Nat neg Nat
```

Thus `match` can be viewed as a special way of adding new term to the monoid of terms,
and together with the equations the new term must satisfies.

## Type variables as variables in the monoid of types

TODO

```
claim swap { 'A 'B -- 'B 'A }
define swap {
  let (x: 'A) let (y: 'B) x y
}
```

```
datatype List {
  null { 'A List }
  cons { 'A 'A List -- 'A List }
}
```

```
claim append { 'A List 'A List -- 'A List }

define append {
  match ('A List) {
   null {}
   cons { let (head) append head List.cons }
  }
}
```

```
datatype Trivial {
  sole { -- Trivial }
}

claim six_soles { -- Trivial List }

define six_soles {
  List.null Trivial.sole List.cons Trivial.sole List.cons Trivial.sole List.cons
  List.null Trivial.sole List.cons Trivial.sole List.cons Trivial.sole List.cons
  append
}
```

## Unification problem as solving equations in monoid

TODO

# Interpretation of Linear logic propositions

TODO

# Dependent type system as an endomorphism of one monoid

If we study _endomorphism of one monoid_,
we will get _dependent type system_
where the space of terms and types are the same monoid.

TODO
