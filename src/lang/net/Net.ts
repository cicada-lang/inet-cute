import { Edge } from "../edge"
import { Port } from "../port"
import { Sign } from "../sign"
import { Value } from "../value"

export type Connection = {
  edge: Edge
  port: Port
}

export type PortEntry = {
  name: string
  sign: Sign
  t: Value
  isPrincipal: boolean
  connection?: Connection
}

export type PortRecord = Record<string, PortEntry>

export type Net = {
  edges: Array<Edge>
  activeEdges: Array<Edge>
  nodePortRecordMap: Map<string, PortRecord>
}
