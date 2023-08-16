import { Node } from "../node"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net, PortRecord } from "./Net"

export function findPortRecord(net: Net, node: Node): PortRecord | undefined {
  const nodeEntry = net.nodeEntries.get(nodeKeyId(node))
  return nodeEntry?.ports
}
