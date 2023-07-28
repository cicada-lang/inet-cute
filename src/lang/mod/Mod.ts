import { Definition } from "../definition"
import * as Definitions from "../definitions"
import { Port } from "../graph"
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

  lookupNetDefinitionOrFail(name: string): Definitions.NetDefinition {
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

  allNetNames(): Array<string> {
    return Array.from(this.definitions.values())
      .filter((definition) => definition instanceof Definitions.NetDefinition)
      .map((definition) => definition.name)
  }
}
