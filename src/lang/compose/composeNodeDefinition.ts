import { NodeDefinition } from "../definition"
import { Node } from "../graph"
import { createNode } from "../graph/createNode"
import { Net } from "../net"
import { connect } from "../net/connect"

export function composeNodeDefinition(
  net: Net,
  definition: NodeDefinition,
): Node {
  const node = createNode(
    definition.mod,
    definition.name,
    definition.input,
    definition.output,
  )

  // Be careful about the order:
  // The first input port connects
  // with the port on the top of the stack.

  for (const port of node.input) {
    const topPort = net.ports.pop()
    if (topPort === undefined) {
      throw new Error(
        `[composeNodeDefinition] I expect a port on top of the stack`,
      )
    }

    connect(net, topPort, port)
  }

  net.ports.push(...node.output)
  net.nodes.push(node)

  return node
}
