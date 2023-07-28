import * as Defs from "../defs"
import { Port } from "../graph"
import { Mod } from "../mod"
import { Type } from "../type"

export type Node = {
  id: number
  def: Defs.NodeDef
  mod: Mod
  name: string
  types: Array<Type>
  input: Array<Port>
  output: Array<Port>
}
