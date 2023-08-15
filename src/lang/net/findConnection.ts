import { nodeKeyId } from "../node/nodeKeyId"
import { Port } from "../port"
import { Connection, Net } from "./Net"

export function findConnection(net: Net, port: Port): Connection | undefined {
  const ports = net.nodePorts.get(nodeKeyId(port.node))
  if (ports === undefined) {
    return undefined
  }

  return ports[port.name]
}
