export const type = {
  $grammar: {
    "type:var": ['"\'"', { name: "variable_name" }],
    "type:term_zero_arity": [{ name: "variable_name" }],
    "type:term": [
      { name: "variable_name" },
      '"("',
      { type_args: "type_args" },
      '")"',
    ],
  },
}

export const type_args = {
  $grammar: {
    "type_args:type_args": [
      {
        types: {
          $ap: ["zero_or_more", "type", '","'],
        },
      },
      { last_type: "type" },
      { $ap: ["optional", '","'] },
    ],
  },
}

export const type_with_optional_semicolon = {
  $grammar: {
    "type_with_optional_semicolon:type_with_optional_semicolon": [
      { type: "type" },
      { $ap: ["optional", '";"'] },
    ],
  },
}

export const type_sequence = {
  $grammar: {
    "type_sequence:type_sequence": [
      {
        types: {
          $ap: ["zero_or_more", "type_with_optional_semicolon"],
        },
      },
    ],
  },
}
