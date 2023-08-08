import { stringToSubscript } from "../../utils/stringToSubscript"
import { Ctx } from "../ctx"
import { tickTypeVarCounter } from "../ctx/tickTypeVarCounter"
import { Value } from "../value"

export function freshenType(
  ctx: Ctx,
  t: Value,
  occurredNames: Map<string, string>,
): Value {
  switch (t["@kind"]) {
    case "TypeVar": {
      const foundName = occurredNames.get(t.name)
      if (foundName === undefined) {
        const subscript = tickTypeVarCounter(ctx, t.name)
        const newName = t.name + stringToSubscript(subscript.toString())
        occurredNames.set(t.name, newName)
        return {
          "@type": "Value",
          "@kind": "TypeVar",
          name: newName,
        }
      } else {
        return {
          "@type": "Value",
          "@kind": "TypeVar",
          name: foundName,
        }
      }
    }

    case "TypeTerm": {
      return {
        "@type": "Value",
        "@kind": "TypeTerm",
        name: t.name,
        args: t.args.map((arg) => freshenType(ctx, arg, occurredNames)),
      }
    }

    default: {
      // TODO Maybe we need to handle other values.
      return t
    }
  }
}
