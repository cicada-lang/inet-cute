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

export const signed_type_with_optional_semicolon = {
  $grammar: {
    "signed_type_with_optional_semicolon:positive": [
      { type: "type" },
      { $ap: ["optional", '";"'] },
    ],
    "signed_type_with_optional_semicolon:negative": [
      '"-"',
      { type: "type" },
      { $ap: ["optional", '";"'] },
    ],
    "signed_type_with_optional_semicolon:neutral": [
      '"±"',
      { type: "type" },
      { $ap: ["optional", '";"'] },
    ],
  },
}

export const signed_type_sequence = {
  $grammar: {
    "signed_type_sequence:signed_type_sequence": [
      {
        types: {
          $ap: ["zero_or_more", "signed_type_with_optional_semicolon"],
        },
      },
    ],
  },
}
