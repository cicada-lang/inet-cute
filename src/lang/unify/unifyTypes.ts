import { Ctx } from "../ctx"
import { appendReport } from "../errors/appendReport"
import { createReport } from "../errors/createReport"
import { Type } from "../type"
import { formatType } from "../type/formatType"
import { deepWalkType } from "./deepWalkType"
import { occurCheck } from "./occurCheck"
import { walkType } from "./walkType"

export function unifyTypes(ctx: Ctx, left: Type, right: Type): void {
  try {
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
      occurCheck(ctx, left.name, right)
      ctx.substitution.set(left.name, right)
      return
    }

    if (right.kind === "TypeVar") {
      occurCheck(ctx, right.name, left)
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
  } catch (error) {
    throw appendReport(error, {
      message: [
        `[unifyTypes] I fail to unify types.`,
        ``,
        `  left: ${formatType(deepWalkType(ctx, left))}`,
        `  right: ${formatType(deepWalkType(ctx, right))}`,
      ].join("\n"),
    })
  }

  throw createReport({
    message: [
      `[unifyTypes] I fail to unify types.`,
      ``,
      `  left: ${formatType(deepWalkType(ctx, left))}`,
      `  right: ${formatType(deepWalkType(ctx, right))}`,
    ].join("\n"),
  })
}
