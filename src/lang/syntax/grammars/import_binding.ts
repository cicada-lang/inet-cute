export const import_binding = {
  $grammar: {
    "import_binding:name": [{ name: "variable_name" }],
    // "import_binding:alias": [
    //   { name: "variable_name" },
    //   '"as"',
    //   { alias: "variable_name" },
    // ],
  },
}

export const import_binding_comma = {
  $grammar: {
    "import_binding_comma:import_binding_comma": [
      { binding: "import_binding" },
      { $ap: ["optional", '","'] },
    ],
  },
}

export const import_bindings = {
  $grammar: {
    "import_bindings:import_bindings": [
      { bindings: { $ap: ["zero_or_more", "import_binding_comma"] } },
      { last_binding: "import_binding" },
      { $ap: ["optional", '","'] },
    ],
  },
}
