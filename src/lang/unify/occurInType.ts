import { type Value } from "../value/index.ts"
import { walkType } from "./walkType.ts"

export function occurInType(
  substitution: Map<string, Value>,
  name: string,
  t: Value,
): boolean {
  t = walkType(substitution, t)

  switch (t["@kind"]) {
    case "Symbol": {
      return t.name === name
    }

    case "TypeTerm": {
      return t.args.some((arg) => occurInType(substitution, name, arg))
    }

    default: {
      // TODO
      return false
    }
  }
}
