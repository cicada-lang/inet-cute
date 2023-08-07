import { Ctx } from "../ctx"
import { Type } from "../type"
import { walkType } from "./walkType"

export function occurInType(ctx: Ctx, name: string, t: Type): boolean {
  t = walkType(ctx, t)

  switch (t.kind) {
    case "PatternVar": {
      return t.name === name
    }

    case "TypeTerm": {
      return t.args.some((arg) => occurInType(ctx, name, arg))
    }
  }
}
