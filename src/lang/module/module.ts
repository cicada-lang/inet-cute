import { Definition } from "../definition"
import * as Defs from "../definitions"
import { Net } from "../net"
import { Port } from "../port"
import { Rule } from "../rule"
import { builtInOperators } from "./built-in-operators"
import { builtInNodes } from "./built-in-nodes"

export class Module {
  defs: Map<string, Definition> = new Map()

  constructor(public url: URL) {
    builtInOperators(this)
    builtInNodes(this)
  }

  getDefOrFail(name: string): Definition {
    const def = this.defs.get(name)
    if (def === undefined) {
      throw new Error(`Undefined name: ${name}`)
    }

    return def
  }

  getNodeDefOrFail(name: string): Defs.NodeDefinition {
    const def = this.getDefOrFail(name)
    if (!(def instanceof Defs.NodeDefinition)) {
      throw new Error(
        `I expect Defs.NodeDef, but ${name} is ${def.constructor.name}`
      )
    }

    return def
  }

  private getNetDefOrFail(name: string): Defs.NetDefinition {
    const def = this.getDefOrFail(name)
    if (!(def instanceof Defs.NetDefinition)) {
      throw new Error(
        `I expect Defs.NetDef, but ${name} is ${def.constructor.name}`
      )
    }

    return def
  }

  apply(net: Net, word: string): void {
    this.getDefOrFail(word).apply(net)
  }

  define(name: string, def: Definition): this {
    this.defs.set(name, def)
    return this
  }

  defineOperator(name: string, apply: (net: Net) => void): this {
    return this.define(name, new Defs.OperatorDefinition(this, name, apply))
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

  allNetNames(): Array<string> {
    return Array.from(this.defs.values())
      .filter((def) => def instanceof Defs.NetDefinition)
      .map((def) => def.name)
  }
}
