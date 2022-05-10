# the paper

- understand proof-nets for all connectives

  - proof-nets--the-parallel-syntax-for-proof-theory--1995.pdf
  - "The linear abstract machine", Lafont, 1990.
  - "From proof-nets", Lafont, 1995

- phase space and monoid -- understand the model theory of linear logic

- coherent space -- understand the denotational semantics of linear logic

# simple types

> linear logic as type system of inet

- Is linear logic with simple types a first order theory?
  i.e. without dependent type -- not as a foundation of mathematics

  - compare with simple typed lambda calculus' logic

# linear prolog

- From the example of `diff-list`,
  we know that inet is like linear logic programming.

# later

- `Node` with optionally named port

  - `NetRenderer` show free port names

- stmt.format
- exp.format

- `NetRenderer` control order

  - need to use builder pattern, just like building SQL query

# experiments

- use inet to encode lambda calculus
- use inet to encode class, object and message sending

# dependent types

> Two levels of computations, execute and cut.

- `Word.cut` & `Word.execute`

- equality between `Net`
- use `Net` as type

# type check

- `type-def.ts` -- `apply`

- `define-type` -- `TermType`

- `forall` for generic type variables

- `define-cons` & `define-elim` -- type check
- `define-net` -- type check words composition

- `Edge` -- type check the two ports
