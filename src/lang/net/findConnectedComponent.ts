import { Node } from "../node"
import { Net } from "./Net"
import { createNet } from "./createNet"
import { findPortRecordOrFail } from "./findPortRecordOrFail"
import { hasNode } from "./hasNode"

export function findConnectedComponent(net: Net, node: Node): Net {
  const component = createNet()
  copyConnectedComponent(net, component, node)
  return component
}

export function copyConnectedComponent(
  net: Net,
  component: Net,
  node: Node,
): void {
  if (hasNode(component, node)) {
    return
  }

  copyNode(net, component, node)

  const portRecord = findPortRecordOrFail(net, node)
  for (const portEntry of Object.values(portRecord)) {
    if (portEntry.connection) {
      copyConnectedComponent(net, component, portEntry.connection.port.node)
    }
  }
}

export function copyNode(source: Net, target: Net, node: Node): void {
  const portRecord = findPortRecordOrFail(source, node)
  //
}
