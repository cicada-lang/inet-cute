import { Definition } from "../definition"
import { Net, Node, createNode } from "../graph"
import { netConnectPorts } from "../graph/netConnectPorts"
import { Mod } from "../mod"
import { PortExp } from "../stmts"

export type NodeKind = "Cons" | "Elim"

export class NodeDefinition implements Definition {
  constructor(
    public mod: Mod,
    public kind: NodeKind,
    public name: string,
    public input: Array<PortExp>,
    public output: Array<PortExp>,
  ) {}

  meaning(net: Net): Node {
    const node = createNode(
      this.kind,
      this.mod,
      this.name,
      this.input,
      this.output,
    )

    // NOTE Be careful about the order.
    for (const port of node.input) {
      const top = net.portStack.pop()
      if (top === undefined) {
        throw new Error(`I expect a port on top of the stack`)
      }

      netConnectPorts(net, top, port)
    }

    net.portStack.push(...node.output)
    net.nodes.push(node)

    return node
  }
}
