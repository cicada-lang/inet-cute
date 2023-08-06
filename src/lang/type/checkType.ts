import { Mod } from "../mod"
import { lookupDefinitionOrFail } from "../mod/lookupDefinitionOrFail"
import { Type } from "./Type"
import { formatType } from "./formatType"

export function checkType(mod: Mod, t: Type): void {
  switch (t.kind) {
    case "TypeVar": {
      return
    }

    case "TypeTerm": {
      const definition = lookupDefinitionOrFail(mod, t.name)
      if (definition.kind !== "TypeDefinition") {
        throw new Error(`[checkType] I expect definition to be TypeDefinition`)
      }

      if (definition.arity !== t.args.length) {
        throw new Error(
          `[checkType] I find wrong arity for type term: ${formatType(
            t,
          )} -- expect ${definition.arity}, given: ${t.args.length}`,
        )
      }
    }
  }
}
