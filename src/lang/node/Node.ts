import * as Defs from "../defs"
import { Mod } from "../mod"
import { Port, createPort } from "../port"
import { Type } from "../type"

let counter = 0

export class Node {
  id: number
  def: Defs.NodeDef
  mod: Mod
  name: string
  types: Array<Type>
  input: Array<Port>
  output: Array<Port>

  constructor(
    def: Defs.NodeDef,
    inputTypes: Array<Type>,
    outputTypes: Array<Type>,
  ) {
    this.id = counter++
    this.def = def
    this.mod = def.mod
    this.name = def.name
    this.types = [...inputTypes, ...outputTypes]
    let portCount = 0
    this.input = inputTypes.map((t) => createPort(this, portCount++))
    this.output = outputTypes.map((t) => createPort(this, portCount++))
  }
}
