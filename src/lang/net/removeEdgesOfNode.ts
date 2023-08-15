import { Net } from "../net"
import { Node } from "../node"
import { findPortConnection } from "./findPortConnection"
import { removeEdge } from "./removeEdge"

export function removeEdgesOfNode(net: Net, node: Node): void {
  for (const port of node.input) {
    const connection = findPortConnection(net, port)
    connection && removeEdge(net, connection.edge)
  }

  for (const port of node.output) {
    const connection = findPortConnection(net, port)
    connection && removeEdge(net, connection.edge)
  }
}
