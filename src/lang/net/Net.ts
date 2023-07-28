import { Action } from "../action"
import { Edge, createEdge } from "../edge"
import { InternalError } from "../errors"
import { Mod } from "../mod"
import { Node } from "../node"
import { Port } from "../port"
import { netCloseFreePorts } from "./netCloseFreePorts"
import { netReleaseFreePorts } from "./netReleaseFreePorts"

export class Net {
  mod: Mod
  nodes: Array<Node> = new Array()
  edges: Array<Edge> = new Array()
  actions: Array<Action> = new Array()
  portStack: Array<Port> = new Array()
  // for named local variables.  
  portStore: Map<string, Port> = new Map()
  wires: Array<{ start: Port; end: Port }> = new Array()

  constructor(mod: Mod) {
    this.mod = mod
  }

  run(): void {
    const closer = netCloseFreePorts(this)
    while (this.actions.length > 0) this.step()
    this.cleanUpWires()
    netReleaseFreePorts(this, closer)
  }

  cleanUpWires(): void {
    for (const wire of this.wires) {
      if (wire.start.connection && wire.end.connection) {
        this.removeEdge(wire.start.connection.edge)
        this.removeEdge(wire.end.connection.edge)

        this.removeNode(wire.start.node)
        this.removeNode(wire.end.node)

        this.connect(wire.start.connection.port, wire.end.connection.port)
      }
    }

    this.wires = []
  }

  private step(): void {
    if (this.portStack.length !== 0) {
      throw new InternalError("I can not handle free port during stepping.")
    }

    const action = this.actions.pop()
    if (action === undefined) return
    else action.act(this.mod, this)
  }

  connect(start: Port, end: Port): void {
    const rule = this.mod.getRuleByPorts(start, end)

    if (rule) {
      this.actions.push(new Action(start, end, rule))
    } else {
      this.edges.push(createEdge(start, end))
    }
  }

  removeNode(node: Node): void {
    const index = this.nodes.indexOf(node)
    if (index !== -1) {
      this.nodes.splice(index, 1)
    }
  }

  removeEdge(edge: Edge): void {
    const index = this.edges.indexOf(edge)
    if (index !== -1) {
      this.edges.splice(index, 1)
    }
  }
}
