import { Mod } from "../mod"
import { Port } from "../port"

export type Node = {
  id: number
  mod: Mod
  name: string
  input: Array<Port>
  output: Array<Port>
}
