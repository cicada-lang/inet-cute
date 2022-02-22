import { Def } from "../def"
import * as Defs from "../defs"
import { Net } from "../net"
import { Port } from "../port"
import { Rule } from "../rule"
import { Type } from "../type"
import { builtInOperators } from "./built-in-operators"

export class Module {
  defs: Map<string, Def> = new Map()
  private rules: Map<string, Rule> = new Map()

  constructor() {
    builtInOperators(this)
  }

  private getOrFail(name: string): Def {
    const def = this.defs.get(name)
    if (def === undefined) {
      throw new Error(`Undefined name: ${name}`)
    }

    return def
  }

  apply(net: Net, word: string): void {
    this.getOrFail(word).execute(net)
  }

  defineNode(name: string, input: Array<string>, output: Array<string>): this {
    this.defs.set(
      name,
      new Defs.NodeDef(this, name, Type.build(input), Type.build(output))
    )

    return this
  }

  defineNet(name: string, words: Array<string>): this {
    // TODO Type check the words.
    this.defs.set(
      name,
      new Defs.NetDef(
        this,
        name,
        words.map((word) => this.getOrFail(word))
      )
    )

    return this
  }

  defineOperator(name: string, execute: (net: Net) => void): this {
    this.defs.set(name, new Defs.OperatorDef(this, name, execute))

    return this
  }

  defineRule(disconnect: [string, string], words: Array<string>): this {
    this.rules.set(
      disconnect.join(" "),
      new Rule(
        this,
        disconnect,
        words.map((word) => this.getOrFail(word))
      )
    )

    return this
  }

  findRuleByPorts(start: Port, end: Port): Rule | undefined {
    if (!(start.isPrincipal() && end.isPrincipal())) {
      return undefined
    }

    const key = `${start.node.name} ${end.node.name}`
    return this.rules.get(key)
  }

  buildNet(name: string): Net {
    const def = this.getOrFail(name)
    if (!(def instanceof Defs.NetDef)) {
      throw new Error(`I expect NetDef, but ${name} is ${def.constructor.name}`)
    }

    const net = new Net(this)
    def.execute(net)
    return net
  }
}
