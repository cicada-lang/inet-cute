- `TermType` & `define-type`

- `define-net` -- type check words composition
- `define-node` -- type check

- `Edge` -- type check the two ports

- support variable in `define-net`'s body

- `Node` with optionally named port

  - `NetRenderer` show free port names

# module

- support module

# website

- setup website to render inet online

  - `inet.cicada-lang.org`

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
