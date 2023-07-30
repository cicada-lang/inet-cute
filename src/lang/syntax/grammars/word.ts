export const word = {
  $grammar: {
    "word:call": [{ name: "variable_name" }],
    "word:let": ['"("', '"let"', { name: "variable_name" }, '")"'],
    "word:port_push": [
      '"("',
      { nodeName: "variable_name" },
      '")"',
      '"-"',
      { portName: "variable_name" },
    ],
    "word:port_connect": [
      { portName: "variable_name" },
      '"-"',
      '"("',
      { nodeName: "variable_name" },
      '")"',
    ],
  },
}

export const words = {
  $grammar: {
    "words:words": [{ words: { $ap: ["zero_or_more", "word"] } }],
  },
}
