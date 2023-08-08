import { Edge } from "../edge"
import { Node } from "../node"
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
