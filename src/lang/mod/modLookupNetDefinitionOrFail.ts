import * as Definitions from "../definitions"
import { Mod } from "./Mod"
import { modLookupDefinitionOrFail } from "./modLookupDefinitionOrFail"

export function modLookupNetDefinitionOrFail(
  mod: Mod,
  name: string,
): Definitions.NetDefinition {
  const definition = modLookupDefinitionOrFail(mod, name)
  if (!(definition instanceof Definitions.NetDefinition)) {
    throw new Error(
      `I expect a net definition, but ${name} is ${definition.constructor.name}`,
    )
  }

  return definition
}
