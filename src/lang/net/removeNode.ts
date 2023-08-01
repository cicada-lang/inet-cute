import { Node } from "../graph/Node"
import { Net } from "../net"

export function removeNode(net: Net, node: Node): void {
  const index = net.nodes.indexOf(node)
  if (index !== -1) {
    net.nodes.splice(index, 1)
  }
}
