import { type Node } from "../node/index.ts"
import { type Net, type PortRecord } from "./Net.ts"
import { findNodeEntry } from "./findNodeEntry.ts"

export function findPortRecord(net: Net, node: Node): PortRecord | undefined {
  const nodeEntry = findNodeEntry(net, node)
  return nodeEntry?.ports
}
