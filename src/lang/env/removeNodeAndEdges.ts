import { Node } from "../node"
import { Env } from "./Env"
import { removeEdge } from "./removeEdge"
import { removeNode } from "./removeNode"

export function removeNodeAndEdges(env: Env, node: Node): void {
  removeNode(env, node)

  for (const port of node.input) {
    port.connection && removeEdge(env, port.connection.edge)
  }

  for (const port of node.output) {
    port.connection && removeEdge(env, port.connection.edge)
  }
}
