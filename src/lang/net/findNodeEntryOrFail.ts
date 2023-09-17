import { Node } from "../node"
import { formatNode } from "../node/formatNode"
import { nodeKey } from "../node/nodeKey"
import { Net, NodeEntry } from "./Net"

export function findNodeEntryOrFail(net: Net, node: Node): NodeEntry {
  const nodeEntry = net.nodeEntries.get(nodeKey(node))
  if (nodeEntry === undefined) {
    throw new Error(
      [
        `[findNodeEntryOrFail] I can not find nodeEntry for node.`,
        ``,
        `  node: ${formatNode(net, node)}`,
      ].join("\n"),
    )
  }

  return nodeEntry
}
