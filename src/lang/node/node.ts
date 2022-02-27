import * as Defs from "../definitions"
import { Module } from "../module"
import { Net } from "../net"
import { Port } from "../port"
import { Type } from "../type"

export class Node {
  static counter = 0

  id: number

  def: Defs.NodeDefinition

  mod: Module
  name: string

  types: Array<Type>

  input: Array<Port>
  output: Array<Port>

  inputReversed: Array<Port>

  constructor(
    def: Defs.NodeDefinition,
    inputTypes: Array<Type>,
    outputTypes: Array<Type>
  ) {
    this.id = Node.counter++

    this.def = def
    this.mod = def.mod
    this.name = def.name

    this.types = [...inputTypes, ...outputTypes]
    this.checkPrincipalType()

    let portCount = 0

    this.input = inputTypes.map((t) => new Port(this, portCount++))
    this.output = outputTypes.map((t) => new Port(this, portCount++))

    this.inputReversed = [...this.input].reverse()
  }

  private checkPrincipalType(): void {
    const principalTypes = this.types.filter((t) => t.isPrincipal())
    if (principalTypes.length !== 1) {
      throw new Error(
        [
          `A node's types should have exactly one principal type`,
          `  number of principal types: ${principalTypes.length}`,
          `  id: ${this.id}`,
          `  name: ${this.name}`,
        ].join("\n")
      )
    }
  }

  get arity(): number {
    return this.types.length - 1
  }

  format(): string {
    return this.name
  }

  // NOTE Do side effect on two port stacks.
  disconnect(net: Net, input: Array<Port>, output: Array<Port>): void {
    for (const port of this.input.filter((port) => !port.isPrincipal())) {
      if (port.edge) {
        if (port.edge.start.node !== this) {
          input.push(port.edge.start)
        }

        if (port.edge.end.node !== this) {
          input.push(port.edge.end)
        }

        net.removeNormalEdge(port.edge)
      }
    }

    for (const port of this.output.filter((port) => !port.isPrincipal())) {
      if (port.edge) {
        if (port.edge.start.node !== this) {
          output.unshift(port.edge.start)
        }

        if (port.edge.end.node !== this) {
          output.unshift(port.edge.end)
        }

        net.removeNormalEdge(port.edge)
      }
    }

    net.removeNode(this)
  }
}
