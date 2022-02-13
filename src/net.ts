import { ActiveEdge, Edge } from "./edge"
import { Module } from "./module"
import { Node } from "./node"
import { Port } from "./port"

export class Net {
  mod: Module

  nodes: Array<Node> = new Array()

  normalEdges: Array<Edge> = new Array()
  activeEdges: Array<ActiveEdge> = new Array()

  // NOTE We use `ports` as a stack to build net.
  ports: Array<Port> = new Array()

  constructor(mod: Module) {
    this.mod = mod
  }

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

      const rule = this.mod.findRuleByPorts(topPort, port)

      if (rule) {
        this.activeEdges.push(new ActiveEdge(topPort, port, rule))
      } else {
        this.normalEdges.push(new Edge(topPort, port))
      }
    }

    this.ports.push(...node.outputPorts)

    this.nodes.push(node)
  }

  step(): void {
    const activeEdge = this.activeEdges.pop()

    if (activeEdge === undefined) {
      return
    }

    const { start, end, rule } = activeEdge

    const ports: Array<Port> = []

    start.node.disconnect(this, ports)
    end.node.disconnect(this, ports)

    // TODO reconnect
    // rule.reconnect(this, ports)
  }

  run(): void {
    while (this.activeEdges.length > 0) {
      this.step()
    }
  }
}
