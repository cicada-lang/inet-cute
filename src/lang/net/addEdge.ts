import { HalfEdge } from "../half-edge"
import { createHalfEdgeId } from "../half-edge/createHalfEdgeId"
import { HalfEdgeEntry, Net } from "../net"

export function addEdge(net: Net): { first: HalfEdge; second: HalfEdge } {
  const firstId = createHalfEdgeId()
  const first = { id: firstId } as HalfEdgeEntry

  const secondId = createHalfEdgeId()
  const second = { id: secondId } as HalfEdgeEntry

  first.otherHalfEdge = { id: second.id }
  second.otherHalfEdge = { id: first.id }

  net.halfEdgeEntries.set(firstId, first)
  net.halfEdgeEntries.set(secondId, second)

  return { first, second }
}
