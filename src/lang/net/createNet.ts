import { Net } from "./Net"

export function createNet(): Net {
  return {
    activeEdges: [],
    nodeEntries: new Map(),
  }
}
