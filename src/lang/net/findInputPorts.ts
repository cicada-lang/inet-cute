import { type Node } from "../node/index.ts"
import { type Port } from "../port/index.ts"
import { type Net } from "./Net.ts"
import { createPortFromPortEntry } from "./createPortFromPortEntry.ts"
import { findPortRecordOrFail } from "./findPortRecordOrFail.ts"

export function findInputPorts(net: Net, node: Node): Array<Port> {
  const portRecord = findPortRecordOrFail(net, node)
  return Object.values(portRecord)
    .filter(({ sign }) => sign === -1)
    .map((portEntry) => createPortFromPortEntry(node, portEntry))
}
