import { Def } from "../def"
import * as Defs from "../defs"
import { Net } from "../net"
import { Node } from "../node"
import { Operator } from "../operator"
import { Port } from "../port"
import { Rule } from "../rule"

export class Module {
  defs: Map<string, Def> = new Map()

  netBuilders: Map<string, Array<string>> = new Map()
  rules: Map<string, Rule> = new Map()
  operators: Map<string, Operator> = new Map([
    ["swap", new Operator("swap")],
    ["rot", new Operator("rot")],
  ])

  defineNode(name: string, input: Array<string>, output: Array<string>): this {
    this.defs.set(name, new Defs.NodeDef(this, name, input, output))
    return this
  }

  buildNode(name: string): Node {
    const nodeDef = this.defs.get(name)

    if (!(nodeDef instanceof Defs.NodeDef)) {
      throw new Error(`Undefined node: ${name}`)
    }

    return nodeDef.build()
  }

  defineNet(name: string, words: Array<string>): this {
    // TODO Type check the words.
    this.netBuilders.set(name, words)
    return this
  }

  buildNet(name: string): Net {
    const netBuilder = this.netBuilders.get(name)

    if (netBuilder === undefined) {
      throw new Error(`Undefined net: ${name}`)
    }

    const net = new Net(this)

    for (const word of netBuilder) {
      const operator = this.findOperator(word)
      if (operator) {
        operator.execute(net)
      } else {
        const node = this.buildNode(word)
        net.connect(node)
      }
    }

    return net
  }

  findOperator(name: string): Operator | undefined {
    return this.operators.get(name)
  }

  defineRule(disconnect: [string, string], reconnect: Array<string>): this {
    this.rules.set(disconnect.join(" "), new Rule(disconnect, reconnect))

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
