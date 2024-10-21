import { type Port } from "../port/index.js"
import { type Net, type PortEntry } from "./Net.js"
import { findNodeEntry } from "./findNodeEntry.js"

export function findPortEntry(net: Net, port: Port): PortEntry | undefined {
  const nodeEntry = findNodeEntry(net, port.node)
  if (nodeEntry === undefined) {
    return undefined
  }

  return nodeEntry.ports[port.name]
}
