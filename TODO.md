> unify `Module` namespace

- `Def` has `mod: Module`

- `Module` has `defs: Map<string, Def>`

  - `NodeDef`
  - `NetDef`
  - `OperatorDef`

- `Module` as `RuleTable` -- for query about `Rule`

- refacor common parts of `rule.reconnect` and `mod.buildNet`

- support variable

- `Net.step` -- handle free ports

  - (A) we should disallow free ports before `step`
  - (B) we can temporarily close the net before `step`

- `Edge` -- type check the two ports
- `Module.defineNet` -- type check words composition

- `TermType`
  - `Module.defineType`

- concrete syntax

- setup website to render inet online

# use inet to encode lambda calculus

# use inet to encode class, object and message sending
