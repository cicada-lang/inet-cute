import { edgeEqual } from "../edge/edgeEqual.js"
import { type Node } from "../node/index.js"
import { type Net } from "./Net.js"
import { copyNode } from "./copyNode.js"
import { findPortRecordOrFail } from "./findPortRecordOrFail.js"
import { hasNode } from "./hasNode.js"

export function copyConnectedComponent(
  net: Net,
  component: Net,
  node: Node,
): void {
  if (hasNode(component, node)) {
    return
  }

  const portRecord = findPortRecordOrFail(net, node)

  copyNode(net, component, node)

  for (const portEntry of Object.values(portRecord)) {
    if (portEntry.connection) {
      copyConnectedComponent(net, component, portEntry.connection.port.node)
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
