import { stringToSubscript } from "../../utils/stringToSubscript"
import { Ctx } from "../ctx"
import { tickTypeVarCounter } from "../ctx/tickTypeVarCounter"
import * as Types from "../type"
import { Type } from "../type"

export function freshenType(
  ctx: Ctx,
  t: Type,
  occurredNames: Map<string, string>,
): Type {
  switch (t.kind) {
    case "TypeVar": {
      const foundName = occurredNames.get(t.name)
      if (foundName === undefined) {
        const subscript = tickTypeVarCounter(ctx, t.name)
        const newName = t.name + stringToSubscript(subscript.toString())
        occurredNames.set(t.name, newName)
        return Types.TypeVar(newName)
      } else {
        return Types.TypeVar(foundName)
      }
    }

    case "TypeTerm": {
      return Types.TypeTerm(
        t.name,
        t.args.map((arg) => freshenType(ctx, arg, occurredNames)),
      )
    }
  }
}
