import { type Definition } from "../definition/index.ts"
import { type Mod } from "./Mod.ts"

export function define(mod: Mod, name: string, definition: Definition): void {
  const found = mod.definitions.get(name)
  if (found !== undefined) {
    throw new Error(`[define] Can not redefine name: ${name}`)
  }

  mod.definitions.set(name, definition)
}
