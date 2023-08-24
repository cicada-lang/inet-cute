// NOTE Preserve keywords for JSON.

const preserved = [
  ...["define", "claim"],
  ...["type", "node", "rule"],
  ...["check"],
  ...["import", "require"],
  ...["then", "end"],
]

export const variable_name = {
  $pattern: [
    "identifier",
    `(^(?!(${preserved.join("|")})$)([_A-Za-z][_\\p{Letter}0-9]*))`,
  ],
}

export const variable_names = {
  $grammar: {
    "variable_names:variable_names": [
      {
        variable_names: {
          $ap: ["zero_or_more", "variable_name", '","'],
        },
      },
      { last_name: "variable_name" },
      { $ap: ["optional", '","'] },
    ],
  },
}
