import { Value } from "../value"

export function deepWalkType(
  substitution: Map<string, Value>,
  t: Value,
): Value {
  switch (t["@kind"]) {
    case "TypeVar": {
      const found = substitution.get(t.name)
      if (found === undefined) {
        return t
      } else {
        return found
      }
    }

    case "TypeTerm": {
      return {
        "@type": "Value",
        "@kind": "TypeTerm",
        name: t.name,
        args: t.args.map((arg) => deepWalkType(substitution, arg)),
      }
    }

    default: {
      // TODO Maybe we need to handle nest values.
      return t
    }
  }
}
