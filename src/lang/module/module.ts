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

  getDefOrFail(name: string): Def {
    const def = this.defs.get(name)
    if (def === undefined) {
      throw new Error(`Undefined name: ${name}`)
    }

    return def
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
        words.map((word) => this.getDefOrFail(word))
      )
    )

    return this
  }

  buildNet(name: string): Net {
    const def = this.getDefOrFail(name)
    if (!(def instanceof Defs.NetDef)) {
      throw new Error(`I expect NetDef, but ${name} is ${def.constructor.name}`)
    }

    const net = new Net(this)
    def.execute(net)
    return net
  }

  apply(net: Net, word: string): void {
    const def = this.defs.get(word)
    if (def === undefined) {
      throw new Error(`Unknown word: ${word}`)
    }

    def.execute(net)
  }

  defineRule(disconnect: [string, string], reconnect: Array<string>): this {
    this.rules.set(disconnect.join(" "), new Rule(this, disconnect, reconnect))
    return this
  }

  findRuleByPorts(start: Port, end: Port): Rule | undefined {
    if (!(start.isPrincipal() && end.isPrincipal())) {
      return undefined
    }

    const key = `${start.node.name} ${end.node.name}`
    return this.rules.get(key)
  }
}
