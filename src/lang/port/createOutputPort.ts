import { Node } from "../node"
import { PortExp } from "../port/PortExp"
import { Port } from "./Port"

export function createOutputPort(node: Node, portExp: PortExp): Port {
  return {
    "@type": "Value",
    "@kind": "Port",
    sign: 1,
    node,
    name: portExp.name,
    t: portExp.t,
    isPrincipal: portExp.isPrincipal,
  }
}
