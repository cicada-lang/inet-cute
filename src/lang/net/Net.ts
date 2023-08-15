import { ActiveEdge, Edge } from "../edge"
import { Port } from "../port"

export type PortConnection = {
  edge: Edge
  port: Port
}

export type Net = {
  edges: Array<Edge>
  activeEdges: Array<ActiveEdge>
  nodePorts: Map<string, Record<string, PortConnection>>
}
