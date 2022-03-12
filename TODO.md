# semantic

- debug `diff-append`

- support variable

# simple type

- `TermType` & `define-type`
- `define-net` -- type check words composition
- `define-node` -- type check
- `Edge` -- type check the two ports

- `Node` with optionally named port

- `NetRenderer` show free port names

# module

- support module

# website

- setup website to render inet online

  - `inet.cicada-lang.org`

# experiments

- use inet to encode lambda calculus
- use inet to encode class, object and message sending

# dependent type

```scheme
(define-type Trivial (-> [] [Type *]))
(define-type List (-> [Type] [Type *]))
```

- equality between `Net`
- use `Net` as type

# later

- `parser-tester.ts` and `parser/tests/`

- improve sexp parser

  - use `;` for comment
