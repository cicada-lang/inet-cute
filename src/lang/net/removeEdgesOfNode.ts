import { Net } from "../net"
import { Node } from "../node"
import { removeEdge } from "./removeEdge"

export function removeEdgesOfNode(net: Net, node: Node): void {
  for (const port of node.input) {
    port.connection && removeEdge(net, port.connection.edge)
  }

  for (const port of node.output) {
    port.connection && removeEdge(net, port.connection.edge)
  }
}
