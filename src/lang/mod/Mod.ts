import { Definition } from "../definition"
import * as Definitions from "../definitions"
import { Net, Port } from "../graph"
import { createNet } from "../graph/createNet"
import { netCleanUpWires } from "../graph/netCleanUpWires"
import { Rule } from "../rule"
import { defineBuiltInOperators } from "./defineBuiltInOperators"

export class Mod {
  defs: Map<string, Definition> = new Map()

  constructor(public url: URL) {
    defineBuiltInOperators(this)
  }

  getDefOrFail(name: string): Definition {
    const def = this.defs.get(name)
    if (def === undefined) {
      throw new Error(`Undefined name: ${name}`)
    }

    return def
  }

  getNodeDefinitionOrFail(name: string): Definitions.NodeDefinition {
    const def = this.getDefOrFail(name)
    if (!(def instanceof Definitions.NodeDefinition)) {
      throw new Error(
        `I expect a node definition, but ${name} is ${def.constructor.name}`,
      )
    }

    return def
  }

  private getNetDefOrFail(name: string): Definitions.NetDefinition {
    const def = this.getDefOrFail(name)
    if (!(def instanceof Definitions.NetDefinition)) {
      throw new Error(
        `I expect a net definition, but ${name} is ${def.constructor.name}`,
      )
    }

    return def
  }

  apply(net: Net, exp: string): void {
    this.getDefOrFail(exp).meaning(net)
  }

  define(name: string, def: Definition): this {
    this.defs.set(name, def)
    return this
  }

  defineOperator(name: string, apply: (net: Net) => void): this {
    return this.define(
      name,
      new Definitions.OperatorDefinition(this, name, apply),
    )
  }

  getRuleByPorts(start: Port, end: Port): Rule | undefined {
    if (start.isPrincipal && end.isPrincipal) {
      return start.node.def.getRule(end.node.def)
    }
  }

  buildNet(name: string): Net {
    const net = createNet(this)
    this.getNetDefOrFail(name).meaning(net)
    netCleanUpWires(net)
    return net
  }

  allNetNames(): Array<string> {
    return Array.from(this.defs.values())
      .filter((def) => def instanceof Definitions.NetDefinition)
      .map((def) => def.name)
  }
}
