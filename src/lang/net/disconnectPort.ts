import { type Port } from "../port/index.js"
import { type Net } from "./Net.js"
import { findNodeEntry } from "./findNodeEntry.js"

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
