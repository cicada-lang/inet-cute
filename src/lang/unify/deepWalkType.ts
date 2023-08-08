import { Ctx } from "../ctx"
import { Type } from "../type"

export function deepWalkType(ctx: Ctx, t: Type): Type {
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
        "@type": "Type",
        "@kind": "TypeTerm",
        name: t.name,
        args: t.args.map((arg) => deepWalkType(ctx, arg)),
      }
    }
  }
}
