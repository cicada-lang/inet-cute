import { Def } from "../def"
import { Net, Node, createNode } from "../graph"
import { netConnect } from "../graph/netConnect"
import { Mod } from "../mod"
import { Rule } from "../rule"
import { Type } from "../type"

export type NodeKind = "Cons" | "Elim"

export class NodeDef extends Def {
  private rules: Map<string, Rule> = new Map()

  constructor(
    public mod: Mod,
    public kind: NodeKind,
    public name: string,
    public input: Array<Type>,
    public output: Array<Type>,
  ) {
    super()
  }

  get fullName(): string {
    return this.mod.url.href + "#" + this.name
  }

  defineRule(end: NodeDef, rule: Rule): void {
    this.rules.set(end.fullName, rule)
  }

  getRule(end: NodeDef): Rule | undefined {
    return this.rules.get(end.fullName)
  }

  build(): Node {
    return createNode(this.kind, this, this.input, this.output)
  }

  refer(net: Net): Node {
    const node = this.build()

    // NOTE Be careful about the order.
    for (const port of [...node.input].reverse()) {
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
