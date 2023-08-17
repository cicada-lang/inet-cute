import { Edge } from "../edge"
import { Node } from "../node"
import { Net } from "./Net"
import { findPortRecordOrFail } from "./findPortRecordOrFail"
import { hasNode } from "./hasNode"
import { moveNode } from "./moveNode"

export function moveConnectedComponent(
  net: Net,
  component: Net,
  node: Node,
): void {
  if (hasNode(component, node)) {
    return
  }

  moveNode(net, component, node)

  const portRecord = findPortRecordOrFail(net, node)
  for (const portEntry of Object.values(portRecord)) {
    if (portEntry.connection) {
      moveConnectedComponent(net, component, portEntry.connection.port.node)
    }
  }

  const remainingActiveEdges: Array<Edge> = []

  for (const activeEdge of net.activeEdges) {
    if (
      hasNode(component, activeEdge.first.node) &&
      hasNode(component, activeEdge.second.node)
    ) {
      component.activeEdges.push(activeEdge)
    } else {
      remainingActiveEdges.push(activeEdge)
    }
  }

  net.activeEdges = remainingActiveEdges
}
