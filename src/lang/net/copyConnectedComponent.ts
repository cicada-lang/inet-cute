import { edgeEqual } from "../edge/edgeEqual"
import { Node, nodeKey } from "../node"
import { Net } from "./Net"
import { cloneNodeEntry } from "./cloneNodeEntry"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail"
import { findNodeEntryOrFail } from "./findNodeEntryOrFail"
import { findPortRecordOrFail } from "./findPortRecordOrFail"
import { hasNode } from "./hasNode"

export function copyConnectedComponent(
  net: Net,
  component: Net,
  node: Node,
): void {
  if (hasNode(component, node)) {
    return
  }

  const portRecord = findPortRecordOrFail(net, node)

  const entry = findNodeEntryOrFail(net, node)
  component.nodeEntries.set(nodeKey(node), cloneNodeEntry(entry))

  for (const portEntry of Object.values(portRecord)) {
    if (portEntry.connection) {
      const halfEdgeEntry = findHalfEdgeEntryOrFail(
        net,
        portEntry.connection.halfEdge,
      )

      const otherHalfEdgeEntry = findHalfEdgeEntryOrFail(
        net,
        halfEdgeEntry.otherHalfEdge,
      )

      component.halfEdgeEntries.set(halfEdgeEntry.id, {
        ...halfEdgeEntry,
      })

      component.halfEdgeEntries.set(otherHalfEdgeEntry.id, {
        ...otherHalfEdgeEntry,
      })

      if (otherHalfEdgeEntry.port) {
        copyConnectedComponent(net, component, otherHalfEdgeEntry.port.node)
      }
    }
  }

  for (const activeEdge of net.activeEdges) {
    if (
      hasNode(component, activeEdge.first.node) &&
      hasNode(component, activeEdge.second.node) &&
      !component.activeEdges.find((edge) => edgeEqual(edge, activeEdge))
    ) {
      component.activeEdges.push(activeEdge)
    }
  }
}
