import * as Defs from "../defs"
import { Mod } from "../mod"
import { Port } from "../graph"
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
