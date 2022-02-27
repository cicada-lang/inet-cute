import { Def } from "../def"
import * as Defs from "../defs"
import { Net } from "../net"
import { Port } from "../port"
import { Rule } from "../rule"
import { Type } from "../type"
import { builtInOperators } from "./built-in-operators"

export class Module {
  defs: Map<string, Def> = new Map()

  constructor(public url: URL) {
    builtInOperators(this)
  }

  private getDefOrFail(name: string): Def {
    const def = this.defs.get(name)
    if (def === undefined) {
      throw new Error(`Undefined name: ${name}`)
    }

    return def
  }

  private getNodeDefOrFail(name: string): Defs.NodeDef {
    const def = this.getDefOrFail(name)
    if (!(def instanceof Defs.NodeDef)) {
      throw new Error(
        `I expect Defs.NodeDef, but ${name} is ${def.constructor.name}`
      )
    }

    return def
  }

  private getNetDefOrFail(name: string): Defs.NetDef {
    const def = this.getDefOrFail(name)
    if (!(def instanceof Defs.NetDef)) {
      throw new Error(
        `I expect Defs.NetDef, but ${name} is ${def.constructor.name}`
      )
    }

    return def
  }

  apply(net: Net, word: string): void {
    this.getDefOrFail(word).apply(net)
  }

  define(name: string, def: Def): this {
    this.defs.set(name, def)
    return this
  }

  defineNode(name: string, input: Array<string>, output: Array<string>): this {
    return this.define(
      name,
      new Defs.NodeDef(this, name, Type.build(input), Type.build(output))
    )
  }

  defineNet(name: string, words: Array<string>): this {
    // TODO Type check the words.
    return this.define(
      name,
      new Defs.NetDef(
        this,
        name,
        words.map((word) => this.getDefOrFail(word))
      )
    )
  }

  defineOperator(name: string, apply: (net: Net) => void): this {
    return this.define(name, new Defs.OperatorDef(this, name, apply))
  }

  defineRule(start: string, end: string, words: Array<string>): this {
    const startNodeDef = this.getNodeDefOrFail(start)
    const endNodeDef = this.getNodeDefOrFail(end)

    startNodeDef.defineRule(
      endNodeDef,
      new Rule(
        this,
        startNodeDef,
        endNodeDef,
        words.map((word) => this.getDefOrFail(word))
      )
    )

    return this
  }

  getRuleByPorts(start: Port, end: Port): Rule | undefined {
    if (start.isPrincipal() && end.isPrincipal()) {
      return start.node.def.getRule(end.node.def)
    }
  }

  buildNet(name: string): Net {
    const net = new Net(this)
    this.getNetDefOrFail(name).apply(net)
    return net
  }
}
