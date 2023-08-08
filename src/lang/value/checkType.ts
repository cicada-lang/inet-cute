import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Value } from "./Value"
import { formatValue } from "./formatValue"

export function checkType(mod: Mod, t: Value): void {
  switch (t["@kind"]) {
    case "TypeVar": {
      return
    }

    case "TypeTerm": {
      const definition = lookupDefinitionOrFail(mod, t.name)
      if (definition["@kind"] !== "TypeDefinition") {
        throw new Error(
          [
            `[checkType] I expect definition to be TypeDefinition.`,
            ``,
            `  definition kind: ${definition["@kind"]}`,
          ].join("\n"),
        )
      }

      if (definition.arity !== t.args.length) {
        throw new Error(
          [
            `[checkType] I find wrong number of args for type term.`,
            ``,
            `  type term: ${formatValue(t)}`,
            `  arity: ${definition.arity}`,
            `  number of args: ${t.args.length}`,
          ].join("\n"),
        )
      }
    }
  }
}
