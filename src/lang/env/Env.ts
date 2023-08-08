import { ActiveEdge, Edge, Port } from "../graph"
import { Mod } from "../mod"
import { Node } from "../node"

export type Env = {
  mod: Mod
  nodes: Array<Node>
  edges: Array<Edge>
  activeEdges: Array<ActiveEdge>
  stack: Array<Port>
  locals: Map<string, Port>
  wires: Array<Edge>
}
