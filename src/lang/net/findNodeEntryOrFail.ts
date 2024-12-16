import { formatNode } from "../node/formatNode.ts"
import { type Node } from "../node/index.ts"
import { nodeKey } from "../node/nodeKey.ts"
import { type Net, type NodeEntry } from "./Net.ts"

export function findNodeEntryOrFail(net: Net, node: Node): NodeEntry {
  const nodeEntry = net.nodeEntries.get(nodeKey(node))
  if (nodeEntry === undefined) {
    throw new Error(
      [
        `[findNodeEntryOrFail] I can not find nodeEntry for node.`,
        ``,
        `  node: ${formatNode(node)}`,
      ].join("\n"),
    )
  }

  return nodeEntry
}
