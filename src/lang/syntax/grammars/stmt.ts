export const stmt = {
  $grammar: {
    "stmt:node": [
      '"node"',
      { name: "variable_name" },
      { input: "ports" },
      "dashline",
      { output: "ports" },
      '"end"',
    ],
    "stmt:elim": [
      '"elim"',
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
    "stmt:claim_with_output": [
      '"claim"',
      { name: "variable_name" },
      { claimedOutputTypes: "type_sequence" },
      '"end"',
    ],
    "stmt:claim_with_input_and_output": [
      '"claim"',
      { name: "variable_name" },
      { claimedInputTypes: "type_sequence" },
      "dashline",
      { claimedOutputTypes: "type_sequence" },
      '"end"',
    ],
    "stmt:define": [
      '"define"',
      { name: "variable_name" },
      { definedWords: "words" },
      '"end"',
    ],
    "stmt:type": [
      '"type"',
      { name: "variable_name" },
      { arity: { $pattern: ["number"] } },
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
