import { composeNodeDefinition } from "../compose/composeNodeDefinition"
import * as Definitions from "../definition"
import { Node } from "../graph/Node"
import { Net } from "../net"

/*

  For `PortReconnect` to work, the free ports on the stack
  need to be closed by a temporary root node.

*/

export function closeFreePorts(net: Net): Node | undefined {
  if (net.ports.length === 0) {
    return undefined
  }
  const definition = Definitions.NodeDefinition(
    net.mod,
    "*root*",
    [...net.ports],
    [],
  )

  return composeNodeDefinition(net, definition)
}
