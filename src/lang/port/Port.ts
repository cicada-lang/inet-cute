import { Edge } from "../edge"
import { Node } from "../node"
import { Value } from "../value"
import { Sign } from "./Sign"

export type PortConnection = {
  edge: Edge
  port: Port
}

export type Port = {
  "@type": "Value"
  "@kind": "Port"
  node: Node
  name: string
  sign: Sign
  t: Value
  isPrincipal: boolean
  connection?: PortConnection
}
