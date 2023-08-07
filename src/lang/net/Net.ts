import { ActiveEdge, Edge, Node, Port } from "../graph"
import { Mod } from "../mod"

export type Net = {
  mod: Mod
  nodes: Array<Node>
  edges: Array<Edge>
  activeEdges: Array<ActiveEdge>
  ports: Array<Port>
  locals: Map<string, Port>
  wires: Array<Edge>
}
