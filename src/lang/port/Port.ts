import { Edge } from "../edge"
import { Node } from "../node"
import { Sign } from "../sign"
import { Value } from "../value"

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
