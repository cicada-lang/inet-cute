import { Port } from "../port"
import { Net, PortEntry } from "./Net"
import { findNodeEntry } from "./findNodeEntry"

export function findPortEntry(net: Net, port: Port): PortEntry | undefined {
  const nodeEntry = findNodeEntry(net, port.node)
  if (nodeEntry === undefined) {
    return undefined
  }

  return nodeEntry.ports[port.name]
}
