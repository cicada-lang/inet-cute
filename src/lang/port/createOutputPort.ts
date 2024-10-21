import { type Node } from "../node/index.js"
import { type PortExp } from "../port/PortExp.js"
import { type Port } from "./Port.js"

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
