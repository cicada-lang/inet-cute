import { InternalError } from "../errors"
import { Action, Edge, Node, Port } from "../graph"
import { Mod } from "../mod"
import { netCleanUpWires } from "./netCleanUpWires"
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
    netCleanUpWires(this)
    netReleaseFreePorts(this, closer)
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
