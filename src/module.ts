import { Node } from "./node"
import { Type } from "./type"

export class Module {
  nodeBuilders: Map<string, () => Node> = new Map()

  defineNode(name: string, input: Array<string>, output: Array<string>): this {
    const nodeBuilder = () =>
      new Node(name, Type.build(input), Type.build(output))

    this.nodeBuilders.set(name, nodeBuilder)
    return this
  }

  buildNode(name: string): Node {
    const nodeBuilder = this.nodeBuilders.get(name)

    if (nodeBuilder === undefined) {
      throw new Error(`Undefined node: ${name}`)
    }

    return nodeBuilder()
  }
}
