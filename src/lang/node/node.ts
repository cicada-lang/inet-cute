import * as Defs from "../defs"
import { Module } from "../module"
import { Net } from "../net"
import { Port } from "../port"
import { Type } from "../type"

export class Node {
  static counter = 0

  id: number

  def: Defs.NodeDef

  mod: Module
  name: string

  types: Array<Type>

  inputPorts: Array<Port>
  outputPorts: Array<Port>

  inputPortsReversed: Array<Port>

  constructor(
    def: Defs.NodeDef,
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

    this.inputPorts = inputTypes.map((t) => new Port(this, portCount++))
    this.outputPorts = outputTypes.map((t) => new Port(this, portCount++))

    this.inputPortsReversed = [...this.inputPorts].reverse()
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
  disconnect(
    net: Net,
    inputPorts: Array<Port>,
    outputPorts: Array<Port>
  ): void {
    for (const port of this.inputPorts.filter((port) => !port.isPrincipal())) {
      if (port.edge) {
        if (port.edge.start.node !== this) {
          inputPorts.push(port.edge.start)
        }

        if (port.edge.end.node !== this) {
          inputPorts.push(port.edge.end)
        }

        net.removeNormalEdge(port.edge)
      }
    }

    for (const port of this.outputPorts.filter((port) => !port.isPrincipal())) {
      if (port.edge) {
        if (port.edge.start.node !== this) {
          outputPorts.unshift(port.edge.start)
        }

        if (port.edge.end.node !== this) {
          outputPorts.unshift(port.edge.end)
        }

        net.removeNormalEdge(port.edge)
      }
    }

    net.removeNode(this)
  }
}
