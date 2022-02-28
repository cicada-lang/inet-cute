import { Definition } from "../definition"
import { Module } from "../module"
import { Net } from "../net"
import { Node } from "../node"
import { Rule } from "../rule"
import { Type } from "../type"

export class NodeDefinition extends Definition {
  private rules: Map<string, Rule> = new Map()

  constructor(
    public mod: Module,
    public name: string,
    public input: Array<Type>,
    public output: Array<Type>
  ) {
    super()
  }

  get fullName(): string {
    return this.mod.url.href + "#" + this.name
  }

  defineRule(end: NodeDefinition, rule: Rule): void {
    this.rules.set(end.fullName, rule)
  }

  getRule(end: NodeDefinition): Rule | undefined {
    return this.rules.get(end.fullName)
  }

  build(): Node {
    return new Node(this, this.input, this.output)
  }

  apply(net: Net): Node {
    const node = this.build()

    // NOTE Be careful about the order.
    for (const port of node.inputReversed) {
      const top = net.ports.pop()
      if (top === undefined) {
        throw new Error(
          `I expect a port on top of the stack to match: ${port.format()}`
        )
      }

      net.connect(top, port)
    }

    net.ports.push(...node.output)
    net.nodes.push(node)

    return node
  }
}
