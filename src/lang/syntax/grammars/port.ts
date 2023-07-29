export const port = {
  $grammar: {
    "port:normal": [{ name: "variable_name" }],
    "port:principal": [{ name: "variable_name" }, '"!"'],
  },
}

export const ports = {
  $grammar: {
    "ports:ports": [{ ports: { $ap: ["zero_or_more", "port"] } }],
  },
}
