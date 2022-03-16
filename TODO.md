- `define-type` -- `TermType`
- `define-cons` & `define-elim` -- type check
- `define-net` -- type check words composition
- `define-net` -- support variables `(let ...)`
- `define-rule` -- support variables `(let ...)`
- `define-rules`

- `Edge` -- type check the two ports
- `Node` with optionally named port
  - `NetRenderer` show free port names

# website

- setup website to render inet online

  - `inet.cicada-lang.org/playground`

    - try atomic design

      https://bradfrost.com/blog/post/atomic-web-design/

    - encode code in the url -- like ts playground

- link to playground from readonlylink code block

# render

- `NetRenderer` control order

  - need to use builder pattern, just like building SQL query

# experiments

- use inet to encode lambda calculus
- use inet to encode class, object and message sending

# dependent type

```scheme
(define-type Trivial (-> [] [Type))
(define-type List (-> [Type] [Type]))
```

- equality between `Net`
- use `Net` as type
