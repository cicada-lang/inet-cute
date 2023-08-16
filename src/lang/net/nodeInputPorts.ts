import { Node } from "../node"
import { Port } from "../port"
import { Net } from "./Net"
import { findPortRecordOrFail } from "./findPortRecordOrFail"

export function nodeInputPorts(net: Net, node: Node): Array<Port> {
  const portRecord = findPortRecordOrFail(net, node)
  return Object.values(portRecord)
    .filter(({ sign }) => sign === -1)
    .map((portEntry) => ({
      "@type": "Value",
      "@kind": "Port",
      node,
      name: portEntry.name,
      sign: portEntry.sign,
      t: portEntry.t,
      isPrincipal: portEntry.isPrincipal,
    }))
}
