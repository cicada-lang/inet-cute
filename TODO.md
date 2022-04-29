# prefix notations

- we can also use `let` to handle multi return value when building graph.

  - thus postfix notation is not needed.

- Postfix notation

  - Cons:

    - Postfix notation is simple too un familiar to us.

    - Postfix notation is not good for editing code.

    - Not expression-based, thus no sub-expression,
      i.e. no parentheses to help us know the border of applications.

  - Pros:

    - Natural for function composition which is associative.

      - Unlike function application which is not associative.

    - Postfix notation is good for keeping the context implicit,
      where during interaction with user,
      the context can be reported as feedback.

      - Example semantics:
        - Return Stack of values in Forth.
        - Tactic in Coq.

    - [Question] Maybe postfix notation is good for
      linear logic and sequenct calculus.

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
