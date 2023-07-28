import { Edge } from "../edge"
import { Node } from "../node"
import { Type } from "../type"

export class Port {
  node: Node
  index: number
  t: Type
  isPrincipal: boolean
  connection?: {
    edge: Edge
    port: Port
  }

  constructor(node: Node, index: number) {
    this.node = node
    this.index = index
    this.t = node.types[index]
    this.isPrincipal = this.t.isPrincipal()
  }

  format(): string {
    return `${this.node.format()}(${this.index})`
  }
}
