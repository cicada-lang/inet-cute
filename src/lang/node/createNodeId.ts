import { Mod } from "../mod"

export function createNodeId(mod: Mod, name: string): string {
  const foundCounter = mod.nodeCounters.get(name)
  if (foundCounter === undefined) {
    mod.nodeCounters.set(name, 0)
    return String(0)
  } else {
    mod.nodeCounters.set(name, foundCounter + 1)
    return String(foundCounter + 1)
  }
}
