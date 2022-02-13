import { Node } from "./node"
import { Edge } from "./edge"
import { Port } from "./port"

export class Net {
  nodes: Array<Node> = new Array()
  edges: Array<Edge> = new Array()

  // NOTE We use `ports` as a stack to build net.
  ports: Array<Port> = new Array()

  connect(node: Node): void {
    for (const port of node.inputPorts) {
      // TODO
    }

    this.ports.push(...node.outputPorts)

    this.nodes.push(node)
  }
}
