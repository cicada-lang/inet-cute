import { Edge, Node } from "../graph"
import { Type } from "../type"

export type Port = {
  node: Node
  name: string
  t: Type
  isPrincipal: boolean
  connection?: {
    edge: Edge
    port: Port
  }
}
