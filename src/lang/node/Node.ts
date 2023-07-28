import * as Defs from "../defs"
import { Mod } from "../mod"
import { Port } from "../port"
import { Type } from "../type"

export class Node {
  static counter = 0
  id: number
  def: Defs.NodeDef
  mod: Mod
  name: string
  types: Array<Type>
  input: Array<Port>
  output: Array<Port>
  inputReversed: Array<Port>

  constructor(
    def: Defs.NodeDef,
    inputTypes: Array<Type>,
    outputTypes: Array<Type>,
  ) {
    this.id = Node.counter++
    this.def = def
    this.mod = def.mod
    this.name = def.name
    this.types = [...inputTypes, ...outputTypes]
    let portCount = 0
    this.input = inputTypes.map((t) => new Port(this, portCount++))
    this.output = outputTypes.map((t) => new Port(this, portCount++))
    this.inputReversed = [...this.input].reverse()
  }


  get arity(): number {
    return this.types.length - 1
  }

  format(): string {
    return `${this.name}#${this.id}`
  }
}
