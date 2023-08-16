import { Node } from "../node"
import { Net } from "./Net"
import { copyConnectedComponent } from "./copyConnectedComponent"
import { createNet } from "./createNet"

export function findConnectedComponent(net: Net, node: Node): Net {
  const component = createNet()
  copyConnectedComponent(net, component, node)
  return component
}
