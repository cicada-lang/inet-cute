import { Node } from "../node"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net, PortConnection } from "./Net"

export function findNodePortsOrCreate(
  net: Net,
  node: Node,
): Record<string, PortConnection> {
  let ports = net.nodePorts.get(nodeKeyId(node))
  if (ports === undefined) {
    ports = {}
    net.nodePorts.set(nodeKeyId(node), ports)
  }

  return ports
}
