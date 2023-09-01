import { edgeEqual } from "../edge/edgeEqual"
import { Node } from "../node"
import { Net } from "./Net"
import { copyNode } from "./copyNode"
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
