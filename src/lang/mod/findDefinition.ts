import { type Definition } from "../definition/index.js"
import { type Mod } from "./Mod.js"

export function findDefinition(mod: Mod, name: string): Definition | undefined {
  return mod.definitions.get(name)
}
