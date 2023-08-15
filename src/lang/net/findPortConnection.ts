import { nodeKeyId } from "../node/nodeKeyId"
import { Port } from "../port"
import { Net, PortConnection } from "./Net"

export function findPortConnection(
  net: Net,
  port: Port,
): PortConnection | undefined {
  const ports = net.nodePorts.get(nodeKeyId(port.node))
  if (ports === undefined) {
    return undefined
  }

  return ports[port.name]
}
