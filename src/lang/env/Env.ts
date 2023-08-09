import { ActiveEdge, Edge } from "../edge"
import { Mod } from "../mod"
import { Value } from "../value"

export type Env = {
  mod: Mod
  edges: Array<Edge>
  activeEdges: Array<ActiveEdge>
  stack: Array<Value>
  locals: Map<string, Value>
  wires: Array<Edge>
}
