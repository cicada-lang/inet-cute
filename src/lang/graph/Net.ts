import { InternalError } from "../errors"
import { Action, Edge, Node, Port } from "../graph"
import { Mod } from "../mod"
import { netCloseFreePorts } from "./netCloseFreePorts"
import { netConnect } from "./netConnect"
import { netReleaseFreePorts } from "./netReleaseFreePorts"
import { netRemoveEdge } from "./netRemoveEdge"
import { netRemoveNode } from "./netRemoveNode"

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
        netRemoveEdge(this, wire.start.connection.edge)
        netRemoveEdge(this, wire.end.connection.edge)

        netRemoveNode(this, wire.start.node)
        netRemoveNode(this, wire.end.node)

        netConnect(this, wire.start.connection.port, wire.end.connection.port)
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
}
