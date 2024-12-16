import { edgeEqual } from "../edge/edgeEqual.ts"
import { type Node } from "../node/index.ts"
import { type Net } from "./Net.ts"
import { copyNode } from "./copyNode.ts"
import { findPortRecordOrFail } from "./findPortRecordOrFail.ts"
import { hasNode } from "./hasNode.ts"

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
