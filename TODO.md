> linear logic as type system of inet

- move paper to `docs/articles`

- extract note of postfix notations

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

    - Postfix notation is the term for sequent calculus of linear logic,
      specially when rules are written in right-side style
      and the comma is understand as "through".

      - cut rule -- concatenation (or say composition)
      - exchange rule -- permutation operators like swap

      For sequent calculus of intuitionistic logic,
      postfix notation is also the term,
      where multiple return value should be understand as "and".

      Note that,
      - for linear logic, we use the stack to build graph (interaction net).
      - for intuitionistic logic, we use the stack to do computation directly.
        - the proof of cut-elimination theorem should give us an algorithm to
          reduce terms to normal form.

    - Natural for function composition which is associative.

      - Unlike function application which is not associative.

    - Postfix notation is good for keeping the context implicit,
      where during interaction with user,
      the context can be reported as feedback.

      Dance with expressions in context.

      - Example semantics:
        - Return Stack of values in Forth.
        - Tactic in Coq.

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
