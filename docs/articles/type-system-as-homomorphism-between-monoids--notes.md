# Cut rule

In sequent calculus of linear logic,
we have the exchange rule,
and when writing the cut rule (and other rules),
it is assumed that the order does not matter.

The key of our design is to limit the use of cut rule,
to make the order matters,
i.e. one can apply the cut rule
only when the following pattern is matched:

- Where `A1` and ... and `An` are not negation,
  and atoms in both `Γ` and `Δ` are not negation.

- Note that, we are still free to use exchange rule,
  and we should use exchange rule, to order the sequent before a cut.

```
|- Γ, A1, ..., An
|- ~A1, ..., ~An, Δ
-------------------- cut
|- Γ, Δ
```

# Session types

According to on Frank Pfenning's works,
additive connectives of linear logic should be viewed as
concurrency by message passing via channel.

A linear logic proposition can be viewed the type of a channel.

- **[problem]** Is alternative understanding of additive connectives possible?

  - The additive conj -- `with` -- like `times` but can do projection only once?
  - The additive disj -- `plus` -- maybe need new primitive operator about parallelism.

# Examples of dependent types

## Vector

```jojo
datatype Vector (A: Type) (length: Nat) {
  null { zero A Vector }
  cons {
    vague (prev: Nat)
    A prev A Vector
    ------
    prev Nat.add1 A Vector
  }
}

claim vector_append {
  implicit (A: Type, y: Nat)
  y A Vector
  implicit (x: Nat)
  x A Vector
  ------
  x y add A Vector
}

rule Vector.null vector_append {}

rule Vector.cons vector_append {
  let (head) vector_append head Vector.cons
}

check { -- six Trivial Vector } {
  Vector.null Trivial.sole Vector.cons Trivial.sole Vector.cons Trivial.sole Vector.cons
  Vector.null Trivial.sole Vector.cons Trivial.sole Vector.cons Trivial.sole Vector.cons
  vector_append
}
```
