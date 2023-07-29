import { Port } from "../graph"
import { Mod } from "../mod"

export type Node = {
  id: number
  mod: Mod
  name: string
  input: Array<Port>
  output: Array<Port>
}
