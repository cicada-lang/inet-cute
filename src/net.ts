import { Node } from "./node"
import { Edge } from "./edge"
import { Port } from "./port"

export class Net {
  nodes: Array<Node> = new Array()

  normalEdges: Array<Edge> = new Array()
  activeEdges: Array<Edge> = new Array()

  // NOTE We use `ports` as a stack to build net.
  ports: Array<Port> = new Array()

  get edges(): Array<Edge> {
    return [...this.activeEdges, ...this.normalEdges]
  }

  connect(node: Node): void {
    // NOTE Be careful about the order.
    for (const port of node.inputPortsReversed) {
      const topPort = this.ports.pop()
      if (topPort === undefined) {
        throw new Error(
          `I expect a port on top of the stach to match: ${port.format()}`
        )
      }

      if (topPort.isPrincipal() && port.isPrincipal()) {
        this.activeEdges.push(new Edge(topPort, port))
      } else {
        this.normalEdges.push(new Edge(topPort, port))
      }
    }

    this.ports.push(...node.outputPorts)

    this.nodes.push(node)
  }
}
