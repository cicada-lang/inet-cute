import { Edge } from "../edge"
import { nodeKey } from "../node/nodeKey"
import { Net } from "./Net"
import { createNodeFromNodeEntry } from "./createNodeFromNodeEntry"
import { createPortFromPortEntry } from "./createPortFromPortEntry"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail"

export function allEdges(net: Net): Array<Edge> {
  const edges: Array<Edge> = []
  const occurred: Set<string> = new Set()

  for (const nodeEntry of net.nodeEntries.values()) {
    const node = createNodeFromNodeEntry(nodeEntry)

    for (const portEntry of Object.values(nodeEntry.ports)) {
      if (portEntry.connection) {
        const first = createPortFromPortEntry(node, portEntry)

        const halfEdgeEntry = findHalfEdgeEntryOrFail(
          net,
          portEntry.connection.halfEdge,
        )

        const otherHalfEdgeEntry = findHalfEdgeEntryOrFail(
          net,
          halfEdgeEntry.otherHalfEdge,
        )

        const second = otherHalfEdgeEntry.port
        if (second === undefined) {
          continue
        }

        const firstOccur = `${nodeKey(node)}-${portEntry.name}`
        const secondOccur = `${nodeKey(second.node)}-${second.name}`

        if (
          !occurred.has(firstOccur + secondOccur) &&
          !occurred.has(secondOccur + firstOccur)
        ) {
          occurred.add(firstOccur + secondOccur)
          occurred.add(secondOccur + firstOccur)
          edges.push({ first, second })
        }
      }
    }
  }

  return edges
}
