import * as Defs from "../defs"
import { Module } from "../module"
import { Port } from "../port"
import { Type } from "../type"

export class Node {
  static counter = 0
  id: number
  def: Defs.NodeDef
  mod: Module
  name: string
  types: Array<Type>
  input: Array<Port>
  output: Array<Port>
  inputReversed: Array<Port>

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
    return `${this.name}#${this.id}`
  }
}
