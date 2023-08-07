import * as Definitions from "../definition"
import { Mod } from "./Mod"
import { lookupDefinitionOrFail } from "./lookupDefinitionOrFail"

export function lookupWordDefinitionOrFail(
  mod: Mod,
  name: string,
): Definitions.WordDefinition {
  const definition = lookupDefinitionOrFail(mod, name)
  if (!(definition.kind === "WordDefinition")) {
    throw new Error(
      `I expect a env definition, but ${name} is ${definition.constructor.name}`,
    )
  }

  return definition
}
