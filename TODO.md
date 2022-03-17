# variable

- `exps/Let`
- `exps/Call`

- `exp.apply`

  - fix `define-rule-stmt` & `rule`
  - fix `define-net-stmt` & `net-definition`

- `define-net` -- support variables `(let ...)`
- `define-rule` -- support variables `(let ...)`

- `Node` with optionally named port
  - `NetRenderer` show free port names

# website

- setup website to render inet online

  - `inet.cicada-lang.org/playground`

    - try atomic design

      https://bradfrost.com/blog/post/atomic-web-design/

    - encode code in the url -- like ts playground

- link to playground from readonlylink code block

- docs

# render

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

- `type-definition.ts` -- `apply`

- `define-type` -- `TermType`

- `forall` for generic type variables

- `define-cons` & `define-elim` -- type check
- `define-net` -- type check words composition

- `Edge` -- type check the two ports
