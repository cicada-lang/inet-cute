export const word = {
  $grammar: {
    "word:call": [{ name: "variable_name" }],
    "word:let": ['"("', '"let"', { name: "variable_name" }, '")"'],
  },
}

export const words = {
  $grammar: {
    "words:words": [{ words: { $ap: ["zero_or_more", "word"] } }],
  },
}
