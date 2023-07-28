import { Action, Edge, Node, Port } from "../graph"
import { Mod } from "../mod"

export type Net = {
  mod: Mod
  nodes: Array<Node>
  edges: Array<Edge>
  actions: Array<Action>
  portStack: Array<Port>
  // for named local variables.
  portStore: Map<string, Port>
  wires: Array<{ start: Port; end: Port }>
}
