import { Edge, Node } from "../graph"
import { Type } from "../type"

export type PortConnection = {
  edge: Edge
  port: Port
}

export type Port = {
  node: Node
  name: string
  t: Type
  isPrincipal: boolean
  connection?: PortConnection
}
