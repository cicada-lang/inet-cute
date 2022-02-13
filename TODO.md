# model

- `Net.step` -- handle `rule.reconnect`

- `Net.step` -- handle free ports

  - (A) we should disallow free ports before `step`
  - (B) we can temporarily close the net before `step`

# later

- `Net` -- `render` SVG

- `Edge` -- type check the two ports
- `Module.defineNet` -- type check words composition

- `TermType`
  - `Module.defineType`
