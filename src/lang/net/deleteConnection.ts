import { nodeKeyId } from "../node/nodeKeyId"
import { Port } from "../port"
import { Net } from "./Net"

export function deleteConnection(net: Net, port: Port): void {
  const ports = net.nodePorts.get(nodeKeyId(port.node))
  if (ports === undefined) {
    return undefined
  }

  delete ports[port.name]
}
