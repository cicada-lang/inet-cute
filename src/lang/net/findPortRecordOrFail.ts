import { Node } from "../node"
import { formatNode } from "../node/formatNode"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net, PortRecord } from "./Net"

export function findPortRecordOrFail(net: Net, node: Node): PortRecord {
  const nodeEntry = net.nodeEntries.get(nodeKeyId(node))
  if (nodeEntry === undefined) {
    throw new Error(
      [
        `[findNodePortsOrFail] I can not find node entry for node.`,
        ``,
        `  node: ${formatNode(node)}`,
      ].join("\n"),
    )
  }

  return nodeEntry.ports
}
