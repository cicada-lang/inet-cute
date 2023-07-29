import { Definition } from "../definition"
import { Mod } from "./Mod"

export function modLookupDefinitionOrFail(mod: Mod, name: string): Definition {
  const definition = mod.definitions.get(name)
  if (definition === undefined) {
    throw new Error(`Undefined name: ${name}`)
  }

  return definition
}
