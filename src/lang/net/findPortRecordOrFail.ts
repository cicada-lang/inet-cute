import { formatNode } from "../node/formatNode.js"
import { type Node } from "../node/index.js"
import { type Net, type PortRecord } from "./Net.js"
import { findNodeEntry } from "./findNodeEntry.js"

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
