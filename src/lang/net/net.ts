import { Action, Edge } from "../edge"
import { Module } from "../module"
import { Node } from "../node"
import { Port } from "../port"

export class Net {
  mod: Module
  nodes: Array<Node> = new Array()
  edges: Array<Edge> = new Array()
  actions: Array<Action> = new Array()
  // NOTE We use `ports` as a stack to build the net.
  ports: Array<Port> = new Array()

  constructor(mod: Module) {
    this.mod = mod
  }

  run(): void {
    while (this.actions.length > 0) {
      this.step()
    }
  }

  step(): void {
    const action = this.actions.pop()
    if (action === undefined) return
    else action.act(this)
  }

  connectPorts(start: Port, end: Port): void {
    const rule = this.mod.getRuleByPorts(start, end)

    if (rule) {
      this.actions.push(new Action(start, end, rule))
    } else {
      this.edges.push(new Edge(start, end))
    }
  }

  removeNode(node: Node): void {
    const index = this.nodes.indexOf(node)
    if (index > -1) {
      this.nodes.splice(index, 1)
    }
  }

  removeNormalEdge(edge: Edge): void {
    const index = this.edges.indexOf(edge)
    if (index > -1) {
      this.edges.splice(index, 1)
    }
  }
}
