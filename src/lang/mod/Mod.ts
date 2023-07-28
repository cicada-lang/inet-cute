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

  lookupDefinitionOrFail(name: string): Definition {
    const definition = this.definitions.get(name)
    if (definition === undefined) {
      throw new Error(`Undefined name: ${name}`)
    }

    return definition
  }

  lookupNodeDefinitionOrFail(name: string): Definitions.NodeDefinition {
    const definition = this.lookupDefinitionOrFail(name)
    if (!(definition instanceof Definitions.NodeDefinition)) {
      throw new Error(
        `I expect a node definition, but ${name} is ${definition.constructor.name}`,
      )
    }

    return definition
  }

  private lookupNetDefinitionOrFail(name: string): Definitions.NetDefinition {
    const definition = this.lookupDefinitionOrFail(name)
    if (!(definition instanceof Definitions.NetDefinition)) {
      throw new Error(
        `I expect a net definition, but ${name} is ${definition.constructor.name}`,
      )
    }

    return definition
  }

  lookupRuleByPorts(start: Port, end: Port): Rule | undefined {
    if (start.isPrincipal && end.isPrincipal) {
      return start.node.definition.lookupRule(end.node.definition)
    }
  }

  buildNet(name: string): Net {
    const net = createNet(this)
    this.lookupNetDefinitionOrFail(name).meaning(net)
    netCleanUpWires(net)
    return net
  }

  allNetNames(): Array<string> {
    return Array.from(this.definitions.values())
      .filter((definition) => definition instanceof Definitions.NetDefinition)
      .map((definition) => definition.name)
  }
}
