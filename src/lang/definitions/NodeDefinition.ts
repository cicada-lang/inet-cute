import { Definition } from "../definition"
import { Net, Node, createNode } from "../graph"
import { netConnect } from "../graph/netConnect"
import { Mod } from "../mod"
import { Type } from "../type"

export type NodeKind = "Cons" | "Elim"

export class NodeDefinition implements Definition {
  constructor(
    public mod: Mod,
    public kind: NodeKind,
    public name: string,
    public input: Array<Type>,
    public output: Array<Type>,
  ) {}

  get fullName(): string {
    return this.mod.url.href + "#" + this.name
  }

  build(): Node {
    return createNode(this.kind, this, this.input, this.output)
  }

  meaning(net: Net): Node {
    const node = this.build()

    // NOTE Be careful about the order.
    for (const port of node.input) {
      const top = net.portStack.pop()
      if (top === undefined) {
        throw new Error(`I expect a port on top of the stack`)
      }

      netConnect(net, top, port)
    }

    net.portStack.push(...node.output)
    net.nodes.push(node)

    return node
  }
}
