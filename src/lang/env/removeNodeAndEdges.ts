import { Node } from "../graph"
import { Env } from "./Env"
import { removeEdge } from "./removeEdge"
import { removeNode } from "./removeNode"

export function removeNodeAndEdges(net: Env, node: Node): void {
  removeNode(net, node)

  for (const port of node.input) {
    port.connection && removeEdge(net, port.connection.edge)
  }

  for (const port of node.output) {
    port.connection && removeEdge(net, port.connection.edge)
  }
}
