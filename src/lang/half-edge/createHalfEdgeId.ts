import { globalHalfEdgeInfo } from "./globalHalfEdgeInfo"

export function createHalfEdgeId(): string {
  const n = globalHalfEdgeInfo.counter++
  return n.toString()
}
