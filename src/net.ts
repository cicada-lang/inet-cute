import { zip } from "lodash"
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

      this.connectPorts(topPort, port)
    }

    this.ports.push(...node.outputPorts)

    this.nodes.push(node)
  }

  private connectPorts(start: Port, end: Port): void {
    const rule = this.mod.findRuleByPorts(start, end)

    if (rule) {
      this.activeEdges.push(new ActiveEdge(start, end, rule))
    } else {
      this.normalEdges.push(new Edge(start, end))
    }
  }

  step(): void {
    const activeEdge = this.activeEdges.pop()

    if (activeEdge === undefined) {
      return
    }

    const { start, end, rule } = activeEdge

    const inputPorts: Array<Port> = []
    const outputPorts: Array<Port> = []

    // NOTE We should disconnect `end` first, then `start`.
    end.node.disconnect(this, inputPorts, outputPorts)
    start.node.disconnect(this, inputPorts, outputPorts)

    this.ports.push(...inputPorts)

    rule.reconnect(this)

    if (this.ports.length !== outputPorts.length) {
      throw new Error(
        [
          `Internal error, resulting ports doesn't match prepared output ports`,
          `  resulting ports length: ${this.ports.length}`,
          `  prepared output ports length: ${outputPorts.length}`,
        ].join("\n")
      )
    }

    for (const [start, end] of zip(this.ports, outputPorts)) {
      this.connectPorts(start, end)
      this.ports.pop()
    }
  }

  removeNormalEdge(edge: Edge): void {
    const index = this.normalEdges.indexOf(edge)
    if (index > -1) {
      this.normalEdges.splice(index, 1)
    }
  }

  run(): void {
    while (this.activeEdges.length > 0) {
      this.step()
    }
  }
}
