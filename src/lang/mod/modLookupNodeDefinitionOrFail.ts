import * as Definitions from "../definitions"
import { Mod } from "./Mod"
import { modLookupDefinitionOrFail } from "./modLookupDefinitionOrFail"

export function modLookupNodeDefinitionOrFail(
  mod: Mod,
  name: string,
): Definitions.NodeDefinition {
  const definition = modLookupDefinitionOrFail(mod, name)
  if (!(definition instanceof Definitions.NodeDefinition)) {
    throw new Error(
      `I expect a node definition, but ${name} is ${definition.constructor.name}`,
    )
  }

  return definition
}
