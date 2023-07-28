import { Edge } from "../graph"
import { Node } from "../graph"
import { Type } from "../type"

export type Port = {
  node: Node
  index: number
  t: Type
  isPrincipal: boolean
  connection?: {
    edge: Edge
    port: Port
  }
}
