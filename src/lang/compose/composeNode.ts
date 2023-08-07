import { Env } from "../env"
import { connect } from "../env/connect"
import { Node } from "../graph"

export function composeNode(env: Env, node: Node): Node {
  // Be careful about the order:
  // The first input port connects
  // with the port on the top of the stack.

  for (const port of node.input) {
    const topPort = env.stack.pop()
    if (topPort === undefined) {
      throw new Error(
        `[composeNodeDefinition] I expect a port on top of the stack.`,
      )
    }

    connect(env, topPort, port)
  }

  env.stack.push(...node.output)
  env.nodes.push(node)

  return node
}
