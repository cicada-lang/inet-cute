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
datatype Vector (A: Type) (length: Nat)
  case null zero A Vector end
  case cons
    vague (prev: Nat)
    A prev A Vector
    ------
    prev add1 A Vector
  end
end

claim vector_append
  implicit (A: Type, y: Nat)
  y A Vector
  implicit (x: Nat)
  x A Vector
  ------
  x y add A Vector
end

rule null vector_append end

rule cons vector_append
  $$head vector_append head cons
end

check six Trivial Vector then
  null sole cons sole cons sole cons
  null sole cons sole cons sole cons
  vector_append
end
```
