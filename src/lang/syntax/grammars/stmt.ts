export const stmt = {
  $grammar: {
    "stmt:node_with_only_output": [
      '"node"',
      { name: "variable_name" },
      { output: "ports" },
      '"end"',
    ],
    "stmt:node": [
      '"node"',
      { name: "variable_name" },
      { input: "ports" },
      "dashline",
      { output: "ports" },
      '"end"',
    ],
    "stmt:rule": [
      '"rule"',
      { start: "variable_name" },
      { end: "variable_name" },
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
    "stmt:show": ['"show"', { words: "words" }, '"end"'],
    "stmt:run": ['"run"', { words: "words" }, '"end"'],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
