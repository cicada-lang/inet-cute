import { Node } from "../node"
import { Port } from "../port"
import { Net } from "./Net"
import { createPortFromPortEntry } from "./createPortFromPortEntry"
import { findPortRecordOrFail } from "./findPortRecordOrFail"

export function findInputPorts(net: Net, node: Node): Array<Port> {
  const portRecord = findPortRecordOrFail(net, node)
  return Object.values(portRecord)
    .filter(({ sign }) => sign === -1)
    .map((portEntry) => createPortFromPortEntry(node, portEntry))
}
