import { nanoid } from "nanoid"
import { Port } from "./port"
import { Type } from "./type"
import { Net } from "./net"

export class Node {
  id: string
  name: string

  types: Array<Type>

  inputPorts: Array<Port>
  outputPorts: Array<Port>

  inputPortsReversed: Array<Port>

  constructor(name: string, inputTypes: Array<Type>, outputTypes: Array<Type>) {
    this.id = nanoid()

    this.name = name

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

  disconnect(net: Net): void {
    // TODO
  }
}
