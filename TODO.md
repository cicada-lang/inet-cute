- `define-cons` & `define-elim` instead of `define-node`

- `TermType` & `define-type`

- `define-cons` & `define-elim` -- type check

- `define-net` -- type check words composition

- `Edge` -- type check the two ports

- support variable in `define-net`'s body

- `Node` with optionally named port

  - `NetRenderer` show free port names

# website

- setup website to render inet online

  - `inet.cicada-lang.org/playground`

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
