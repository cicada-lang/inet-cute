import { type Value } from "../value/index.js"

export function walkType(substitution: Map<string, Value>, t: Value): Value {
  while (t["@kind"] === "Symbol") {
    const found = substitution.get(t.name)
    if (found === undefined) {
      return t
    } else {
      t = found
    }
  }

  return t
}
