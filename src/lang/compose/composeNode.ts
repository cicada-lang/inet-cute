import { Node } from "../graph"
import { Net } from "../net"
import { connect } from "../net/connect"

export function composeNode(net: Net, node: Node): Node {
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
