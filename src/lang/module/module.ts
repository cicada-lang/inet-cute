import { Def } from "../def"
import * as Defs from "../defs"
import { Net } from "../net"
import { Port } from "../port"
import { Rule } from "../rule"
import { builtInOperators } from "./built-in-operators"

export class Module {
  defs: Map<string, Def> = new Map()

  constructor(public url: URL) {
    builtInOperators(this)
  }

  getDefOrFail(name: string): Def {
    const def = this.defs.get(name)
    if (def === undefined) {
      throw new Error(`Undefined name: ${name}`)
    }

    return def
  }

  getNodeDefOrFail(name: string): Defs.NodeDef {
    const def = this.getDefOrFail(name)
    if (!(def instanceof Defs.NodeDef)) {
      throw new Error(
        `I expect a node definition, but ${name} is ${def.constructor.name}`
      )
    }

    return def
  }

  private getNetDefOrFail(name: string): Defs.NetDef {
    const def = this.getDefOrFail(name)
    if (!(def instanceof Defs.NetDef)) {
      throw new Error(
        `I expect a net definition, but ${name} is ${def.constructor.name}`
      )
    }

    return def
  }

  apply(net: Net, exp: string): void {
    this.getDefOrFail(exp).apply(net)
  }

  define(name: string, def: Def): this {
    this.defs.set(name, def)
    return this
  }

  defineOperator(name: string, apply: (net: Net) => void): this {
    return this.define(name, new Defs.OperatorDef(this, name, apply))
  }

  getRuleByPorts(start: Port, end: Port): Rule | undefined {
    if (start.isPrincipal() && end.isPrincipal()) {
      return start.node.def.getRule(end.node.def)
    }
  }

  buildNet(name: string): Net {
    const net = new Net(this)
    this.getNetDefOrFail(name).apply(net)
    net.cleanUpWires()
    return net
  }

  allNetNames(): Array<string> {
    return Array.from(this.defs.values())
      .filter((def) => def instanceof Defs.NetDef)
      .map((def) => def.name)
  }
}
