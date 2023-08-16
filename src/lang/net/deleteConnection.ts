import { nodeKeyId } from "../node/nodeKeyId"
import { Port } from "../port"
import { Net } from "./Net"

export function deleteConnection(net: Net, port: Port): void {
  const nodeEntry = net.nodeEntries.get(nodeKeyId(port.node))
  if (nodeEntry === undefined) {
    return undefined
  }

  delete nodeEntry.ports[port.name].connection
}
