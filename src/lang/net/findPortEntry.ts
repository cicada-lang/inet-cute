import { type Port } from "../port/index.ts"
import { type Net, type PortEntry } from "./Net.ts"
import { findNodeEntry } from "./findNodeEntry.ts"

export function findPortEntry(net: Net, port: Port): PortEntry | undefined {
  const nodeEntry = findNodeEntry(net, port.node)
  if (nodeEntry === undefined) {
    return undefined
  }

  return nodeEntry.ports[port.name]
}
