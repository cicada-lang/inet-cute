export const stmts = {
  $grammar: {
    "stmts:stmts": [{ stmts: { $ap: ["zero_or_more", "stmt"] } }],
  },
}

export const stmt = {
  $grammar: {
    "stmt:define-node": [
      '"("',
      '"define-node"',
      { name: "identifier" },
      '"("',
      '"-"',
      '">"',
      '"["',
      { input: "words" },
      '"]"',
      '"["',
      { output: "words" },
      '"]"',
      '")"',
      '")"',
    ],
    "stmt:define-net": [
      '"("',
      '"define-net"',
      { name: "identifier" },
      '"("',
      '"-"',
      '">"',
      '"["',
      { input: "words" },
      '"]"',
      '"["',
      { output: "words" },
      '"]"',
      '")"',
      { words: "words" },
      '")"',
    ],
    "stmt:define-rule": [
      '"("',
      '"define-rule"',
      '"["',
      { start: "identifier" },
      { end: "identifier" },
      '"]"',
      '"["',
      { words: "words" },
      '"]"',
      '")"',
    ],
  },
}

export const words = {
  $grammar: {
    "words:words": [{ words: { $ap: ["zero_or_more", "word"] } }],
  },
}

export const word = {
  $grammar: {
    "word:identifier": [{ name: "identifier" }],
    "word:star": ['"*"'],
  },
}
