import { Edge } from "../edge"
import { Port } from "../port"
import { Sign } from "../sign"
import { Value } from "../value"

/*

  A net is an undirected graph where each edge
  must be connected through ports.

  We implement a net like adjacency list,
  but the list of nodes is replaced by a record of ports.

*/

export type Net = {
  edges: Array<Edge>
  activeEdges: Array<Edge>
  nodeEntries: Map<string, NodeEntry>
}

export type NodeEntry = {
  id: string
  name: string
  url: URL
  ports: PortRecord
}

export type PortRecord = Record<string, PortEntry>

export type PortEntry = {
  name: string
  sign: Sign
  t: Value
  isPrincipal: boolean
  connection?: Connection
}

export type Connection = {
  edge: Edge
  port: Port
}
