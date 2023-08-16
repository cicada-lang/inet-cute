import { Node } from "../node"
import { formatNode } from "../node/formatNode"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net, NodeEntry } from "./Net"

export function findNodeEntryOrFail(net: Net, node: Node): NodeEntry {
  const nodeEntry = net.nodeEntries.get(nodeKeyId(node))
  if (nodeEntry === undefined) {
    throw new Error(
      [
        `[findNodeEntryOrFail] I can not find nodePorts for node.`,
        ``,
        `  node: ${formatNode(node)}`,
      ].join("\n"),
    )
  }

  return nodeEntry
}
