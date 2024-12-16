import { type Mod } from "../mod/index.ts"
import { globalNodeCounters } from "./globalNodeCounters.ts"

export function createNodeId(mod: Mod, name: string): string {
  const foundCounter = globalNodeCounters.get(name)
  if (foundCounter === undefined) {
    globalNodeCounters.set(name, 0)
    return String(0)
  } else {
    globalNodeCounters.set(name, foundCounter + 1)
    return String(foundCounter + 1)
  }
}
