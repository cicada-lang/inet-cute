import { Node } from "./node"
import { Edge } from "./edge"
import { Port } from "./port"

export class Net {
  nodes: Array<Node> = new Array()

  noramlEdges: Array<Edge> = new Array()
  activeEdges: Array<Edge> = new Array()

  // NOTE We use `ports` as a stack to build net.
  ports: Array<Port> = new Array()

  connect(node: Node): void {
    // NOTE Be careful about the order.
    for (const port of node.inputPortsReversed) {
      const toc = this.ports.pop()
      if (toc === undefined) {
        throw new Error(
          `I expect a port on top of the stach to match: ${port.format()}`
        )
      }

      this.noramlEdges.push(new Edge(toc, port))
    }

    this.ports.push(...node.outputPorts)

    this.nodes.push(node)
  }
}
