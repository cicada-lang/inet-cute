import { Mod } from "./Mod"

export function tickNodeCounter(mod: Mod, name: string): number {
  const foundCounter = mod.nodeCounters.get(name)
  if (foundCounter === undefined) {
    mod.nodeCounters.set(name, 0)
    return 0
  } else {
    mod.nodeCounters.set(name, foundCounter + 1)
    return foundCounter + 1
  }
}
