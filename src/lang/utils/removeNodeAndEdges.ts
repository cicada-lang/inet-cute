import { Env } from "../env"
import { Node } from "../node"
import { removeEdge } from "./removeEdge"

export function removeNodeAndEdges(env: Env, node: Node): void {
  for (const port of node.input) {
    port.connection && removeEdge(env, port.connection.edge)
  }

  for (const port of node.output) {
    port.connection && removeEdge(env, port.connection.edge)
  }
}
