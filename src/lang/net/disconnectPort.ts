import { type Port } from "../port/index.ts"
import { type Net } from "./Net.ts"
import { findNodeEntry } from "./findNodeEntry.ts"

export function disconnectPort(net: Net, port: Port): Port | undefined {
  const nodeEntry = findNodeEntry(net, port.node)
  if (nodeEntry === undefined) {
    return undefined
  }

  const connectedPort = nodeEntry.ports[port.name].connection?.port
  delete nodeEntry.ports[port.name].connection

  if (connectedPort) {
    disconnectPort(net, connectedPort)
  }

  return connectedPort
}
