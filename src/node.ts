import { nanoid } from "nanoid"
import { Type } from "./type"

export class Node {
  id: string
  name: string
  inputTypes: Array<Type>
  outputTypes: Array<Type>
  types: Array<Type>

  constructor(name: string, inputTypes: Array<Type>, outputTypes: Array<Type>) {
    this.id = nanoid()
    this.name = name
    this.inputTypes = inputTypes
    this.outputTypes = outputTypes
    this.types = [...this.inputTypes, ...this.outputTypes]
    this.checkPrincipalType()
  }

  get arity(): number {
    return this.types.length - 1
  }

  getType(index: number): Type {
    const t = this.types[index]
    if (t === undefined) {
      throw new Error(
        [
          `Can not get type of node`,
          `  index: ${index}`,
          `  id: ${this.id}`,
          `  name: ${this.name}`,
        ].join("\n")
      )
    }

    return t
  }

  private checkPrincipalType(): void {
    const principalTypes = this.types.filter((t) => t.isPrincipal())
    if (principalTypes.length !== 1) {
      throw new Error(
        [
          `A node should have exactly one principal type`,
          `  number of principal types: ${principalTypes.length}`,
          `  id: ${this.id}`,
          `  name: ${this.name}`,
        ].join("\n")
      )
    }
  }
}
