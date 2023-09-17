import { Edge, edgeEqual } from "../edge"
import { Node, nodeKey } from "../node"
import { Net } from "./Net"
import { findHalfEdgeEntryOrFail } from "./findHalfEdgeEntryOrFail"
import { findNodeEntryOrFail } from "./findNodeEntryOrFail"
import { findPortRecordOrFail } from "./findPortRecordOrFail"
import { hasNode } from "./hasNode"

export function moveConnectedComponent(
  net: Net,
  component: Net,
  node: Node,
): void {
  moveNodeEntries(net, component, node)
  deleteHalfEdgeEntries(net, component)
  moveActiveEdges(net, component)
}

export function deleteHalfEdgeEntries(net: Net, component: Net): void {
  for (const halfEdgeEntry of component.halfEdgeEntries.values()) {
    net.halfEdgeEntries.delete(halfEdgeEntry.id)
  }
}

export function moveNodeEntries(net: Net, component: Net, node: Node): void {
  if (hasNode(component, node)) {
    return
  }

  const portRecord = findPortRecordOrFail(net, node)

  const entry = findNodeEntryOrFail(net, node)
  component.nodeEntries.set(nodeKey(node), entry)
  net.nodeEntries.delete(nodeKey(node))

  for (const portEntry of Object.values(portRecord)) {
    if (portEntry.connection) {
      const halfEdgeEntry = findHalfEdgeEntryOrFail(
        net,
        portEntry.connection.halfEdge,
      )

      const ohterHalfEdgeEntry = findHalfEdgeEntryOrFail(
        net,
        halfEdgeEntry.otherHalfEdge,
      )

      component.halfEdgeEntries.set(halfEdgeEntry.id, halfEdgeEntry)
      component.halfEdgeEntries.set(ohterHalfEdgeEntry.id, ohterHalfEdgeEntry)

      if (ohterHalfEdgeEntry.port) {
        moveNodeEntries(net, component, ohterHalfEdgeEntry.port.node)
      }
    }
  }
}

export function moveActiveEdges(net: Net, component: Net): void {
  const remainingActiveEdges: Array<Edge> = []

  for (const activeEdge of net.activeEdges) {
    if (
      hasNode(component, activeEdge.first.node) &&
      hasNode(component, activeEdge.second.node) &&
      !component.activeEdges.find((edge) => edgeEqual(edge, activeEdge))
    ) {
      component.activeEdges.push(activeEdge)
    } else {
      remainingActiveEdges.push(activeEdge)
    }
  }

  net.activeEdges = remainingActiveEdges
}
