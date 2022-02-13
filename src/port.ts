import { Node } from "./node"
import { Type } from "./type"

export class Port {
  node: Node
  index: number
  t: Type

  constructor(node: Node, index: number) {
    this.node = node
    this.index = index
    this.t = node.types[index]
  }
}
