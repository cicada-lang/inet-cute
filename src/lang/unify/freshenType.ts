import { stringToSubscript } from "../../utils/stringToSubscript"
import { Ctx } from "../ctx"
import { tickVariableCounter } from "../ctx/tickVariableCounter"
import * as Types from "../type"
import { Type } from "../type"

export function freshenType(
  ctx: Ctx,
  t: Type,
  occurredNames: Map<string, string>,
): Type {
  switch (t.kind) {
    case "PatternVar": {
      const foundName = occurredNames.get(t.name)
      if (foundName === undefined) {
        const subscript = tickVariableCounter(ctx, t.name)
        const newName = t.name + stringToSubscript(subscript.toString())
        occurredNames.set(t.name, newName)
        return Types.PatternVar(newName)
      } else {
        return Types.PatternVar(foundName)
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
