import { Ctx } from "../ctx"
import * as Types from "../type"
import { Type } from "../type"

export function deepWalkType(ctx: Ctx, t: Type): Type {
  switch (t.kind) {
    case "PatternVar": {
      const found = ctx.substitution.get(t.name)
      if (found === undefined) {
        return t
      } else {
        return found
      }
    }

    case "TypeTerm": {
      return Types.TypeTerm(
        t.name,
        t.args.map((arg) => deepWalkType(ctx, arg)),
      )
    }
  }
}
