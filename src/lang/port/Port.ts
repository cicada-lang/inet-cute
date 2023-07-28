import { Edge } from "../edge"
import { Node } from "../node"
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
