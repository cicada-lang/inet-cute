import { Net } from "./Net"

export function createNet(): Net {
  return {
    edges: [],
    activeEdges: [],
    nodeEntries: new Map(),
  }
}
