import { globalNodeCounters } from "../node/globalNodeCounters"
import { Mod } from "./Mod"

export function tickNodeCounter(mod: Mod, name: string): number {
  const foundCounter = globalNodeCounters.get(name)
  if (foundCounter === undefined) {
    globalNodeCounters.set(name, 0)
    return 0
  } else {
    globalNodeCounters.set(name, foundCounter + 1)
    return foundCounter + 1
  }
}
