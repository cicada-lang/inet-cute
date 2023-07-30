import * as Definitions from "../definitions"
import { Net } from "./Net"
import { Node } from "./Node"

/*

  For `PortReconnect` to work, the free ports on the stack
  need to be closed by a temporary root node.

*/

export function closeFreePorts(net: Net): Node | undefined {
  if (net.portStack.length === 0) {
    return undefined
  }

  return new Definitions.NodeDefinition(
    net.mod,
    "*root*",
    [...net.portStack],
    [],
  ).meaning(net)
}
