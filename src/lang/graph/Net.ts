import { Action, Edge, Node, Port } from "../graph"
import { Mod } from "../mod"

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
}
