import { ActiveEdge, Edge } from "../edge"
import { Module } from "../module"
import { Node } from "../node"
import { Port } from "../port"

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

  run(): void {
    while (this.activeEdges.length > 0) {
      this.step()
    }
  }

  step(): void {
    const activeEdge = this.activeEdges.pop()

    if (activeEdge === undefined) {
      return
    }

    const { start, end, rule } = activeEdge

    const input: Array<Port> = []
    const output: Array<Port> = []

    // NOTE We should disconnect `end` first, then `start`.
    end.node.disconnect(this, input, output)
    start.node.disconnect(this, input, output)

    this.ports.push(...input)

    rule.reconnect(this)

    if (this.ports.length !== output.length) {
      throw new Error(
        [
          `Internal error, resulting ports doesn't match prepared output ports`,
          `  resulting ports length: ${this.ports.length}`,
          `  prepared output ports length: ${output.length}`,
        ].join("\n")
      )
    }

    while (this.ports.length > 0) {
      const start = this.ports.pop() as Port
      const end = output.pop() as Port
      this.connectPorts(start, end)
    }
  }

  connectPorts(start: Port, end: Port): void {
    const rule = this.mod.getRuleByPorts(start, end)

    if (rule) {
      this.activeEdges.push(new ActiveEdge(start, end, rule))
    } else {
      this.normalEdges.push(new Edge(start, end))
    }
  }

  removeNode(node: Node): void {
    const index = this.nodes.indexOf(node)
    if (index > -1) {
      this.nodes.splice(index, 1)
    }
  }

  removeNormalEdge(edge: Edge): void {
    const index = this.normalEdges.indexOf(edge)
    if (index > -1) {
      this.normalEdges.splice(index, 1)
    }
  }
}
