import * as Definitions from "../definitions"
import { Mod } from "./Mod"
import { lookupDefinitionOrFail } from "./lookupDefinitionOrFail"

export function lookupNodeDefinitionOrFail(
  mod: Mod,
  name: string,
): Definitions.NodeDefinition {
  const definition = lookupDefinitionOrFail(mod, name)
  if (!(definition instanceof Definitions.NodeDefinition)) {
    throw new Error(
      `I expect a node definition, but ${name} is ${definition.constructor.name}`,
    )
  }

  return definition
}
