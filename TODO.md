# prefix notations

- we can also use `let` to handle multi return value when building graph.
  - thus postfix notation is not needed.
  - postfix notation is not good because of editing problem

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
