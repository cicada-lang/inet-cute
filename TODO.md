> linear logic as type system of inet

- implement simple type for inet

  - is this first order theory?
    i.e. without dependent type -- not as a foundation of mathematics

    - compare with simple typed lambda calculus' logic

- how to understand additive connectives?
  - conj -- `with` -- like `times` but can do projection only once?
  - disj -- `plus` -- maybe need new primitive operator about parallelism

# linear prolog

- from the example of `diff-list`,
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
