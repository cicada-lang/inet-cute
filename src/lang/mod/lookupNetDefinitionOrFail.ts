import * as Definitions from "../definition"
import { Mod } from "./Mod"
import { lookupDefinitionOrFail } from "./lookupDefinitionOrFail"

export function lookupNetDefinitionOrFail(
  mod: Mod,
  name: string,
): Definitions.NetDefinition {
  const definition = lookupDefinitionOrFail(mod, name)
  if (!(definition.kind === "NetDefinition")) {
    throw new Error(
      `I expect a net definition, but ${name} is ${definition.constructor.name}`,
    )
  }

  return definition
}
