import { nanoid } from "nanoid"
import { Type } from "./type"

export class Node {
  id: string
  name: string
  inputTypes: Array<Type>
  outputTypes: Array<Type>

  constructor(name: string, inputTypes: Array<Type>, outputTypes: Array<Type>) {
    this.id = nanoid()
    this.name = name
    this.inputTypes = inputTypes
    this.outputTypes = outputTypes
    this.checkPrincipalType()
  }

  get arity(): number {
    return this.inputTypes.length + this.outputTypes.length - 1
  }

  private get types(): Array<Type> {
    return [...this.inputTypes, ...this.outputTypes]
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
