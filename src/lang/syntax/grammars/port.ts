export const port = {
  $grammar: {
    "port:normal": [
      { name: "variable_name" },
      '":"',
      { type: "type" },
      { $ap: ["optional", '";"'] },
    ],
    "port:principal": [
      { name: "variable_name" },
      '"!"',
      '":"',
      { type: "type" },
      { $ap: ["optional", '";"'] },
    ],
  },
}

export const ports = {
  $grammar: {
    "ports:ports": [{ ports: { $ap: ["zero_or_more", "port"] } }],
  },
}
