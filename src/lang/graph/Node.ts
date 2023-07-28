import * as Definitions from "../definitions"
import { Port } from "../graph"
import { Mod } from "../mod"
import { Type } from "../type"

export type Node = {
  id: number
  def: Definitions.NodeDefinition
  mod: Mod
  name: string
  types: Array<Type>
  input: Array<Port>
  output: Array<Port>
}
