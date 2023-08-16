import { Node } from "../node"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net, PortRecord } from "./Net"

export function findPortRecord(net: Net, node: Node): PortRecord | undefined {
  return net.nodePortRecords.get(nodeKeyId(node))
}
