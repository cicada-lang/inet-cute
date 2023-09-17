import { globalNodeCounters } from "./globalNodeCounters"

export function createNodeId(name: string): string {
  const foundCounter = globalNodeCounters.get(name)
  if (foundCounter === undefined) {
    globalNodeCounters.set(name, 0)
    return String(0)
  } else {
    globalNodeCounters.set(name, foundCounter + 1)
    return String(foundCounter + 1)
  }
}
