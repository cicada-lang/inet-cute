import { HalfEdge } from "../half-edge"
import { createHalfEdgeId } from "../half-edge/createHalfEdgeId"
import { Mod } from "../mod"
import { Net } from "../net"

export function addEdge(
  net: Net,
  mod: Mod,
): { first: HalfEdge; second: HalfEdge } {
  const firstId = createHalfEdgeId(mod)
  const first = { id: firstId }

  const secondId = createHalfEdgeId(mod)
  const second = { id: secondId }

  net.halfEdgeEntries.set(firstId, first)
  net.halfEdgeEntries.set(secondId, second)

  return { first, second }
}
