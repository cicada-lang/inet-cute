import { HalfEdge } from "../half-edge"
import { Net } from "./Net"

export function deleteHalfEdgeEntry(net: Net, halfEdge: HalfEdge): void {
  net.halfEdgeEntries.delete(halfEdge.id)
}
