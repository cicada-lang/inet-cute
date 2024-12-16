import { type Node } from "../node/index.ts"
import { type Port } from "../port/index.ts"
import { type PortEntry } from "./Net.ts"

export function createPortFromPortEntry(
  node: Node,
  portEntry: PortEntry,
): Port {
  return {
    "@type": "Value",
    "@kind": "Port",
    node,
    name: portEntry.name,
    sign: portEntry.sign,
    t: portEntry.t,
    isPrincipal: portEntry.isPrincipal,
  }
}
