import { Ctx } from "../ctx"
import { Value } from "../value"

export function deepWalkType(ctx: Ctx, t: Value): Value {
  switch (t["@kind"]) {
    case "TypeVar": {
      const found = ctx.substitution.get(t.name)
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
        args: t.args.map((arg) => deepWalkType(ctx, arg)),
      }
    }

    default: {
      // TODO Maybe we need to handle nest values.
      return t
    }
  }
}
