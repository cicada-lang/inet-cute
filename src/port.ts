import { Node } from "./node"

export class Port {
  node: Node
  index: number

  constructor(node: Node, index: number) {
    this.node = node
    this.index = index
  }
}
