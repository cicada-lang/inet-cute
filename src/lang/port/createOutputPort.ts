import { type Node } from "../node/index.ts"
import { type PortExp } from "../port/PortExp.ts"
import { type Port } from "./Port.ts"

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
