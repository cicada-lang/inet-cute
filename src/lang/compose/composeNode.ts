import { Env } from "../env"
import { Node } from "../node"
import { connect } from "../utils/connect"

export function composeNode(env: Env, node: Node): Node {
  // Be careful about the order:
  // The first input port connects
  // with the port on the top of the stack.

  for (const port of node.input) {
    const value = env.stack.pop()
    if (value === undefined) {
      throw new Error(
        `[composeNodeDefinition] I expect a value on top of the stack.`,
      )
    }

    if (value["@kind"] !== "Port") {
      throw new Error(
        [
          `[composeNodeDefinition] I expect the top value on the stack to be a Port.`,
          ``,
          `  value['@kind']: ${value["@kind"]}`,
        ].join("\n"),
      )
    }

    connect(env, value, port)
  }

  env.stack.push(...node.output)
  env.nodes.push(node)

  return node
}
