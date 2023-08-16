import { Node } from "../node"
import { Net, PortRecord } from "./Net"
import { findNodeEntry } from "./findNodeEntry"

export function findPortRecord(net: Net, node: Node): PortRecord | undefined {
  const nodeEntry = findNodeEntry(net, node)
  return nodeEntry?.ports
}
