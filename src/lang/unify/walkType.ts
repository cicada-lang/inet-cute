import { Ctx } from "../ctx"
import { Value } from "../value"

export function walkType(ctx: Ctx, t: Value): Value {
  while (t["@kind"] === "TypeVar") {
    const found = ctx.substitution.get(t.name)
    if (found === undefined) {
      return t
    } else {
      t = found
    }
  }

  return t
}
