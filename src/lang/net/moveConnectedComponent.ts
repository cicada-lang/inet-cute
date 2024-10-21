import { edgeEqual } from "../edge/edgeEqual.js"
import { type Edge } from "../edge/index.js"
import { type Node } from "../node/index.js"
import { type Net } from "./Net.js"
import { findPortRecordOrFail } from "./findPortRecordOrFail.js"
import { hasNode } from "./hasNode.js"
import { moveNode } from "./moveNode.js"

export function moveConnectedComponent(
  net: Net,
  component: Net,
  node: Node,
): void {
  if (hasNode(component, node)) {
    return
  }

  const portRecord = findPortRecordOrFail(net, node)

  moveNode(net, component, node)

  for (const portEntry of Object.values(portRecord)) {
    if (portEntry.connection) {
      moveConnectedComponent(net, component, portEntry.connection.port.node)
    }
  }

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
