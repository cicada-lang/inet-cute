---
title: Shallow Embedding
---

Alternative to design sexp-based language,
one might shallow embed the DSL to JavaScript.

```typescript
Module.create()
  .node(`sole`, { output: `Trivial *` })
  .node(`null`, { output: `TrivialList *` })
  .node(`cons`, { input: `TrivialList Trivial`, output: `Nat *` })
  .node(`append`, { input: `TrivialList TrivialList *`, output: `TrivialList` })

  .rule(`null append`, ``)
  .rule(`cons append`, `rot rot append swap cons`)

  .net(`six-soles`, {
    output: `TrivialList`,
    body: `
     null sole cons sole cons sole cons
     null sole cons sole cons sole cons
     append
   `,
  })
```
