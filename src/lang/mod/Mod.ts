import { Definition } from "../definition"
import * as Definitions from "../definitions"
import { Net, Port } from "../graph"
import { createNet } from "../graph/createNet"
import { netCleanUpWires } from "../graph/netCleanUpWires"
import { Rule } from "../rule"
import { defineBuiltInOperators } from "./defineBuiltInOperators"

export class Mod {
  definitions: Map<string, Definition> = new Map()

  constructor(public url: URL) {
    defineBuiltInOperators(this)
  }

  getDefinitionOrFail(name: string): Definition {
    const definition = this.definitions.get(name)
    if (definition === undefined) {
      throw new Error(`Undefined name: ${name}`)
    }

    return definition
  }

  getNodeDefinitionOrFail(name: string): Definitions.NodeDefinition {
    const definition = this.getDefinitionOrFail(name)
    if (!(definition instanceof Definitions.NodeDefinition)) {
      throw new Error(
        `I expect a node definition, but ${name} is ${definition.constructor.name}`,
      )
    }

    return definition
  }

  private getNetDefinitionOrFail(name: string): Definitions.NetDefinition {
    const definition = this.getDefinitionOrFail(name)
    if (!(definition instanceof Definitions.NetDefinition)) {
      throw new Error(
        `I expect a net definition, but ${name} is ${definition.constructor.name}`,
      )
    }

    return definition
  }

  apply(net: Net, exp: string): void {
    this.getDefinitionOrFail(exp).meaning(net)
  }

  define(name: string, definition: Definition): this {
    this.definitions.set(name, definition)
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
      return start.node.definition.getRule(end.node.definition)
    }
  }

  buildNet(name: string): Net {
    const net = createNet(this)
    this.getNetDefinitionOrFail(name).meaning(net)
    netCleanUpWires(net)
    return net
  }

  allNetNames(): Array<string> {
    return Array.from(this.definitions.values())
      .filter((definition) => definition instanceof Definitions.NetDefinition)
      .map((definition) => definition.name)
  }
}
