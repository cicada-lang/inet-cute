import { composeNode } from "../compose/composeNode"
import { Node } from "../graph/Node"
import { createNode } from "../graph/createNode"
import { Net } from "../net"

/*

  For `PortReconnect` to work, the free ports on the stack
  need to be closed by a temporary root node.

*/

export function closeFreePorts(net: Net): Node | undefined {
  if (net.ports.length === 0) {
    return undefined
  }

  const node = createNode(net.mod, "*root*", [...net.ports], [])
  return composeNode(net, node)
}
