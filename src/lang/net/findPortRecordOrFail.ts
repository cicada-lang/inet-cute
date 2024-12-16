import { formatNode } from "../node/formatNode.ts"
import { type Node } from "../node/index.ts"
import { type Net, type PortRecord } from "./Net.ts"
import { findNodeEntry } from "./findNodeEntry.ts"

export function findPortRecordOrFail(net: Net, node: Node): PortRecord {
  const nodeEntry = findNodeEntry(net, node)
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
