import { Env } from "../env"
import { Node } from "../graph/Node"

export function removeNode(env: Env, node: Node): void {
  const index = env.nodes.indexOf(node)
  if (index !== -1) {
    env.nodes.splice(index, 1)
  }
}
