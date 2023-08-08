import { ActiveEdge, Edge } from "../edge"
import { Mod } from "../mod"
import { Node } from "../node"
import { Value } from "../value"

export type Env = {
  mod: Mod
  nodes: Array<Node>
  edges: Array<Edge>
  activeEdges: Array<ActiveEdge>
  stack: Array<Value>
  locals: Map<string, Value>
  wires: Array<Edge>
}
