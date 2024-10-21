import { type Node } from "../node/index.js"
import { type Port } from "../port/index.js"
import { type PortEntry } from "./Net.js"

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
