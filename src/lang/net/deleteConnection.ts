import { Port } from "../port"
import { Net } from "./Net"
import { findNodeEntry } from "./findNodeEntry"

export function deleteConnection(net: Net, port: Port): void {
  const nodeEntry = findNodeEntry(net, port.node)
  if (nodeEntry === undefined) {
    return undefined
  }

  delete nodeEntry.ports[port.name].connection
}
