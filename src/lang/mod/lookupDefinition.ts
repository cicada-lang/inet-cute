import { Definition } from "../definition"
import { Mod } from "./Mod"

export function lookupDefinition(
  mod: Mod,
  name: string,
): Definition | undefined {
  return mod.definitions.get(name)
}
