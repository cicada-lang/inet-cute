import { Port } from "../graph"
import { Mod } from "../mod"
import { Type } from "../type"

export type Node = {
  id: number
  mod: Mod
  name: string
  types: Array<Type>
  input: Array<Port>
  output: Array<Port>
}
