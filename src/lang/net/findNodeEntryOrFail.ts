import { formatNode } from "../node/formatNode.js"
import { type Node } from "../node/index.js"
import { nodeKey } from "../node/nodeKey.js"
import { type Net, type NodeEntry } from "./Net.js"

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
