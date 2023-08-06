import { Ctx } from "../ctx"
import { Type } from "../type"

export function walkType(ctx: Ctx, t: Type): Type {
  while (t.kind === "TypeVar") {
    const found = ctx.substitution.get(t.name)
    if (found === undefined) {
      return t
    } else {
      t = found
    }
  }

  return t
}
