import { Port } from "../port"
import { Net } from "./Net"
import { findNodeEntry } from "./findNodeEntry"

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
