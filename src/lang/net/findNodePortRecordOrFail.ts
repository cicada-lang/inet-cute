import { Node } from "../node"
import { formatNode } from "../node/formatNode"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net, PortRecord } from "./Net"

export function findNodePortRecordOrFail(net: Net, node: Node): PortRecord {
  let ports = net.nodePortRecords.get(nodeKeyId(node))
  if (ports === undefined) {
    throw new Error(
      [
        `[findNodePortsOrFail] I can not find nodePorts for node.`,
        ``,
        `  node: ${formatNode(node)}`,
      ].join("\n"),
    )
  }

  return ports
}
