import { Node } from "../node"
import { formatNode } from "../node/formatNode"
import { nodeKeyId } from "../node/nodeKeyId"
import { Connection, Net } from "./Net"

export function findNodePortsOrFail(
  net: Net,
  node: Node,
): Record<string, Connection> {
  let ports = net.nodePorts.get(nodeKeyId(node))
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
