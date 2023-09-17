import { HalfEdge } from "../half-edge"
import { HalfEdgeEntry, Net } from "./Net"

export function findHalfEdgeEntry(
  net: Net,
  halfEdge: HalfEdge,
): HalfEdgeEntry | undefined {
  return net.halfEdgeEntries.get(halfEdge.id)
}
