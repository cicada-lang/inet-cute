import { Node } from "./node"
import { Type } from "./type"

export class Module {
  nodes: Map<string, () => Node> = new Map()

  defineNode(name: string, input: Array<string>, output: Array<string>): this {
    const nodeBuilder = () =>
      new Node(name, Type.build(input), Type.build(output))

    this.nodes.set(name, nodeBuilder)
    return this
  }
}
