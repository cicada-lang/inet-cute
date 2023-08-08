export const word = {
  $grammar: {
    "word:call": [{ name: "variable_name" }],
    "word:local": ['"$"', { name: "variable_name" }],
    "word:port_push": [
      '"("',
      { nodeName: "variable_name" },
      '")"',
      '"-"',
      { portName: "variable_name" },
    ],
    "word:port_reconnect": [
      { portName: "variable_name" },
      '"-"',
      '"("',
      { nodeName: "variable_name" },
      '")"',
    ],
    "word:type_var": ['"\'"', { name: "variable_name" }],
    "word:label": ['":"', { label: "variable_name" }],
    "word:label_is_important": ['":"', { label: "variable_name" }, '"!"'],
  },
}

export const words = {
  $grammar: {
    "words:words": [{ words: { $ap: ["zero_or_more", "word"] } }],
  },
}
