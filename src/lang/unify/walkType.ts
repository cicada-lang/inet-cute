import { Value } from "../value"

export function walkType(substitution: Map<string, Value>, t: Value): Value {
  while (t["@kind"] === "TypeVar") {
    const found = substitution.get(t.name)
    if (found === undefined) {
      return t
    } else {
      t = found
    }
  }

  return t
}
