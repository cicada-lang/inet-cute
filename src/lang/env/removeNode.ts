import { Env } from "../env"
import { Node } from "../graph/Node"

export function removeNode(net: Env, node: Node): void {
  const index = net.nodes.indexOf(node)
  if (index !== -1) {
    net.nodes.splice(index, 1)
  }
}
