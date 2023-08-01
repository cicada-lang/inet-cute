import { Definition } from "../definition"
import { Node } from "../graph"
import { PortExp } from "../graph/PortExp"
import { createNode } from "../graph/createNode"
import { Mod } from "../mod"
import { Net } from "../net"
import { connect } from "../net/connect"

export class NodeDefinition implements Definition {
  constructor(
    public mod: Mod,
    public name: string,
    public input: Array<PortExp>,
    public output: Array<PortExp>,
  ) {}

  compose(net: Net): Node {
    const node = createNode(this.mod, this.name, this.input, this.output)

    // Be careful about the order:
    // The first input port connects
    // with the port on the top of the stack.

    for (const port of node.input) {
      const top = net.ports.pop()
      if (top === undefined) {
        throw new Error(
          `[NodeDefinition.compose] I expect a port on top of the stack`,
        )
      }

      connect(net, top, port)
    }

    net.ports.push(...node.output)
    net.nodes.push(node)

    return node
  }
}
