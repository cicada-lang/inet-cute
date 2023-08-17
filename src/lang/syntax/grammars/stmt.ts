export const stmt = {
  $grammar: {
    "stmt:node": [
      '"node"',
      { name: "variable_name" },
      { input: "words" },
      "dashline",
      { output: "words" },
      '"end"',
    ],
    "stmt:rule": [
      '"rule"',
      { first: "variable_name" },
      { second: "variable_name" },
      { words: "words" },
      '"end"',
    ],
    "stmt:claim": [
      '"claim"',
      { name: "variable_name" },
      { input: "words" },
      "dashline",
      { output: "words" },
      '"end"',
    ],
    "stmt:define": [
      '"define"',
      { name: "variable_name" },
      { words: "words" },
      '"end"',
    ],
    "stmt:type": [
      '"type"',
      { name: "variable_name" },
      { input: "words" },
      "dashline",
      { output: "words" },
      '"end"',
    ],
    "stmt:check": [
      '"check"',
      { input: "words" },
      "dashline",
      { output: "words" },
      '"then"',
      { words: "words" },
      '"end"',
    ],
    "stmt:import": [
      '"import"',
      { bindings: "import_bindings" },
      '"from"',
      { path: { $pattern: ["string"] } },
    ],
    "stmt:require": ['"require"', { path: { $pattern: ["string"] } }],
    "stmt:compose": [{ word: "word" }],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
