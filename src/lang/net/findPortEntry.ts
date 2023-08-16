import { nodeKeyId } from "../node/nodeKeyId"
import { Port } from "../port"
import { Net, PortEntry } from "./Net"

export function findPortEntry(net: Net, port: Port): PortEntry | undefined {
  const nodeEntry = net.nodeEntries.get(nodeKeyId(port.node))
  if (nodeEntry === undefined) {
    return undefined
  }

  return nodeEntry.ports[port.name]
}
