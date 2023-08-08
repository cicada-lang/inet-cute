import { Ctx } from "../ctx"
import { Value } from "../value"
import { walkType } from "./walkType"

export function occurInType(ctx: Ctx, name: string, t: Value): boolean {
  t = walkType(ctx, t)

  switch (t["@kind"]) {
    case "TypeVar": {
      return t.name === name
    }

    case "TypeTerm": {
      return t.args.some((arg) => occurInType(ctx, name, arg))
    }

    default: {
      // TODO
      return false
    }
  }
}
