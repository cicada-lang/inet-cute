import { Definition } from "../definition"
import { Mod } from "./Mod"

export function findDefinition(mod: Mod, name: string): Definition | undefined {
  return mod.definitions.get(name)
}
