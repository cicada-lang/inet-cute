import { type Node } from "../node/index.js"
import { type Port } from "../port/index.js"
import { type Net } from "./Net.js"
import { createPortFromPortEntry } from "./createPortFromPortEntry.js"
import { findPortRecordOrFail } from "./findPortRecordOrFail.js"

export function findInputPorts(net: Net, node: Node): Array<Port> {
  const portRecord = findPortRecordOrFail(net, node)
  return Object.values(portRecord)
    .filter(({ sign }) => sign === -1)
    .map((portEntry) => createPortFromPortEntry(node, portEntry))
}
