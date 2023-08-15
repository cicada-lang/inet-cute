import { nodeKeyId } from "../node/nodeKeyId"
import { Port } from "../port"
import { Net, PortEntry } from "./Net"

export function findPortEntry(net: Net, port: Port): PortEntry | undefined {
  const ports = net.nodePortEntriesMap.get(nodeKeyId(port.node))
  if (ports === undefined) {
    return undefined
  }

  return ports[port.name]
}
