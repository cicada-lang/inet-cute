export const stmt = {
  $grammar: {
    "stmt:defnode": [
      '"defnode"',
      { name: "variable_name" },
      { input: "ports" },
      "dashline",
      { output: "ports" },
      '"end"',
    ],
    "stmt:defelim": [
      '"defelim"',
      { name: "variable_name" },
      { input: "ports" },
      "dashline",
      { output: "ports" },
      '"end"',
    ],
    "stmt:defrule": [
      '"defrule"',
      { start: "variable_name" },
      { end: "variable_name" },
      { words: "words" },
      '"end"',
    ],
    "stmt:defnet": [
      '"defnet"',
      { name: "variable_name" },
      { words: "words" },
      '"end"',
    ],
  },
}

export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}
