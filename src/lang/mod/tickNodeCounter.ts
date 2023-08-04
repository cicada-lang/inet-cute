import { Mod } from "./Mod"

export function tickNodeCounter(mod: Mod, name: string): number {
  return mod.nodeCounter++
}
