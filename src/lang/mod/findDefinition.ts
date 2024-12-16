import { type Definition } from "../definition/index.ts"
import { type Mod } from "./Mod.ts"

export function findDefinition(mod: Mod, name: string): Definition | undefined {
  return mod.definitions.get(name)
}
