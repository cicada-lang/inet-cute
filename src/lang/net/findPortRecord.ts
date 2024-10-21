import { type Node } from "../node/index.js"
import { type Net, type PortRecord } from "./Net.js"
import { findNodeEntry } from "./findNodeEntry.js"

export function findPortRecord(net: Net, node: Node): PortRecord | undefined {
  const nodeEntry = findNodeEntry(net, node)
  return nodeEntry?.ports
}
