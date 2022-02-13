import { Node } from "./node"
import { Type } from "./type"

export class Port {
  node: Node
  index: number

  constructor(node: Node, index: number) {
    this.node = node
    this.index = index
  }

  get type(): Type {
    return this.node.types[this.index]
  }
}
