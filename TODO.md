- matchers for all `Stmts`
- setup command line tools
- remove inner tests
- move methods from `Module` to `Stmts`

# semantic

- `Net.step` -- handle free ports

  - (A) we should disallow free ports before `step`
  - (B) we can temporarily close the net before `step`

- equality between `Net`

- support variable

- support module

# simple type

- `Edge` -- type check the two ports

- `Module.defineNet` -- type check words composition

- `TermType`
  - `Module.defineType`

# website

- setup website to render inet online

# experiments

- use inet to encode lambda calculus
- use inet to encode class, object and message sending
