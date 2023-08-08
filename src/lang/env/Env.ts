import { ActiveEdge, Edge } from "../edge"
import { Mod } from "../mod"
import { Node } from "../node"
import { Port } from "../port"

export type Env = {
  mod: Mod
  nodes: Array<Node>
  edges: Array<Edge>
  activeEdges: Array<ActiveEdge>
  stack: Array<Port>
  locals: Map<string, Port>
  wires: Array<Edge>
}
