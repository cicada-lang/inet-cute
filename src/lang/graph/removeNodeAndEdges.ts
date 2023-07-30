import { Net, Node } from "../graph"
import { removeEdge } from "./removeEdge"
import { removeNode } from "./removeNode"

export function removeNodeAndEdges(net: Net, node: Node): void {
  removeNode(net, node)

  for (const port of node.input) {
    port.connection && removeEdge(net, port.connection.edge)
  }

  for (const port of node.output) {
    port.connection && removeEdge(net, port.connection.edge)
  }
}
