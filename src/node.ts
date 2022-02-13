import { nanoid } from "nanoid"
import { Type } from "./type"
import { Port } from "./port"

export class Node {
  id: string
  name: string
  inputPorts: Array<Port>
  outputPorts: Array<Port>
  types: Array<Type>

  constructor(name: string, inputTypes: Array<Type>, outputTypes: Array<Type>) {
    this.id = nanoid()

    this.name = name

    this.types = [...inputTypes, ...outputTypes]
    this.checkPrincipalType()

    let portCount = 0

    this.inputPorts = inputTypes.map(t => new Port(this, portCount++))
    this.outputPorts = outputTypes.map(t => new Port(this, portCount++))
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

  // getType(index: number): Type {
  //   const t = this.types[index]
  //   if (t === undefined) {
  //     throw new Error(
  //       [
  //         `Can not get type of node`,
  //         `  index: ${index}`,
  //         `  id: ${this.id}`,
  //         `  name: ${this.name}`,
  //       ].join("\n")
  //     )
  //   }

  //   return t
  // }
}
