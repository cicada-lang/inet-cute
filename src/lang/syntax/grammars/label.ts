export const label = {
  $grammar: {
    "label:label": ['":"', { label: "variable_name" }],
  },
}

export const labels = {
  $grammar: {
    "labels:labels": [{ labels: { $ap: ["zero_or_more", "label"] } }],
  },
}
