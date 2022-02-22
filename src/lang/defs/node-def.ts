import { Def } from "../def"
import { Module } from "../module"
import { Net } from "../net"
import { Node } from "../node"
import { Rule } from "../rule"
import { Type } from "../type"

export class NodeDef extends Def {
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

  defineRule(end: NodeDef, rule: Rule): void {
    this.rules.set(end.fullName, rule)
  }

  getRule(end: NodeDef): Rule | undefined {
    return this.rules.get(end.fullName)
  }

  private build(): Node {
    return new Node(this, this.input, this.output)
  }

  execute(net: Net): void {
    net.connect(this.build())
  }
}
