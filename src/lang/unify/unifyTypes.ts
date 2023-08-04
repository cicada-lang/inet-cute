import { Ctx } from "../ctx"
import { Type } from "../type"
import { walkType } from "./walkType"

export function unifyTypes(ctx: Ctx, left: Type, right: Type): void {
  left = walkType(ctx, left)
  right = walkType(ctx, right)

  if (
    left.kind === "TypeVar" &&
    right.kind === "TypeVar" &&
    left.name === right.name
  ) {
    return
  }

  if (left.kind === "TypeVar") {
    ctx.substitution.set(left.name, right)
    return
  }

  if (right.kind === "TypeVar") {
    ctx.substitution.set(right.name, left)
    return
  }

  if (
    left.kind === "TypeTerm" &&
    right.kind === "TypeTerm" &&
    left.name === right.name
  ) {
    for (const [index, leftArg] of left.args.entries()) {
      const rightArg = right.args[index]
      unifyTypes(ctx, leftArg, rightArg)
    }

    return
  }

  console.error({ left, right })
  throw new Error(`[unifyTypes] I fail to unify types`)
}
