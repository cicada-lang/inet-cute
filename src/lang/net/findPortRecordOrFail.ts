import { Node } from "../node"
import { formatNode } from "../node/formatNode"
import { Net, PortRecord } from "./Net"
import { findNodeEntry } from "./findNodeEntry"

export function findPortRecordOrFail(net: Net, node: Node): PortRecord {
  const nodeEntry = findNodeEntry(net, node)
  if (nodeEntry === undefined) {
    throw new Error(
      [
        `[findPortRecordOrFail] I can not find node entry for node.`,
        ``,
        `  node: ${formatNode(net, node)}`,
      ].join("\n"),
    )
  }

  return nodeEntry.ports
}
