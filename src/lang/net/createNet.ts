import { Net } from "./Net"

export function createNet(): Net {
  return {
    edges: [],
    activeEdges: [],
    nodePortRecords: new Map(),
  }
}
