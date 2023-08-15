import { Net } from "../net"
import { Node } from "../node"
import { deleteEdge } from "./deleteEdge"
import { findConnection } from "./findConnection"

export function deleteEdgesOfNode(net: Net, node: Node): void {
  for (const port of node.input) {
    const connection = findConnection(net, port)
    connection && deleteEdge(net, connection.edge)
  }

  for (const port of node.output) {
    const connection = findConnection(net, port)
    connection && deleteEdge(net, connection.edge)
  }
}
