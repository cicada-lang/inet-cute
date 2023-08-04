import { stringToSubscript } from "../../utils/stringToSubscript"
import { Ctx } from "../ctx"
import { tickVariableCounter } from "../ctx/tickVariableCounter"
import * as Types from "../type"
import { Type } from "../type"

export function freshenType(ctx: Ctx, t: Type): Type {
  switch (t.kind) {
    case "TypeTerm": {
      return Types.TypeTerm(
        t.name,
        t.args.map((arg) => freshenType(ctx, arg)),
      )
    }

    case "TypeVar": {
      const subscript = tickVariableCounter(ctx, t.name)
      const newName = t.name + stringToSubscript(subscript.toString())
      return Types.TypeVar(newName)
    }
  }
}
