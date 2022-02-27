import { Definition } from "../definition"
import { Module } from "../module"
import { Net } from "../net"
import { Node } from "../node"
import { Rule } from "../rule"
import { Type } from "../type"
import { ActiveEdge, Edge } from "../edge"
import { Port } from "../port"

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

  private build(): Node {
    return new Node(this, this.input, this.output)
  }

  apply(net: Net): void {
    const node = this.build()

    // NOTE Be careful about the order.
    for (const port of node.inputPortsReversed) {
      const topPort = net.ports.pop()
      if (topPort === undefined) {
        throw new Error(
          `I expect a port on top of the stach to match: ${port.format()}`
        )
      }

      net.connectPorts(topPort, port)
    }

    net.ports.push(...node.outputPorts)
    net.nodes.push(node)
  }
}
