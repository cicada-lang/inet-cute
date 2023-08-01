import * as Definitions from "../definitions"
import { Net } from "../graph/Net"
import { Node } from "../graph/Node"

/*

  For `PortReconnect` to work, the free ports on the stack
  need to be closed by a temporary root node.

*/

export function closeFreePorts(net: Net): Node | undefined {
  if (net.ports.length === 0) {
    return undefined
  }

  return new Definitions.NodeDefinition(
    net.mod,
    "*root*",
    [...net.ports],
    [],
  ).call(net)
}
