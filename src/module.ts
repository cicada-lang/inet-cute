import { Node } from "./node"
import { Type } from "./type"

export class Module {
  nodeBuilders: Map<string, () => Node> = new Map()
  netBuilders: Map<string, Array<string>> = new Map()

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

  defineNet(name: string, words: Array<string>): this {
    // TODO Type check the words.
    this.netBuilders.set(name, words)
    return this
  }
}
