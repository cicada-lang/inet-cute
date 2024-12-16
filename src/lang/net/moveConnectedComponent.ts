import { edgeEqual } from "../edge/edgeEqual.ts"
import { type Edge } from "../edge/index.ts"
import { type Node } from "../node/index.ts"
import { type Net } from "./Net.ts"
import { findPortRecordOrFail } from "./findPortRecordOrFail.ts"
import { hasNode } from "./hasNode.ts"
import { moveNode } from "./moveNode.ts"

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
