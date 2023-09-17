import { Port } from "../port"
import { Net } from "./Net"
import { findHalfEdgeEntry } from "./findHalfEdgeEntry"
import { findNodeEntry } from "./findNodeEntry"

export function disconnectPort(net: Net, port: Port): void {
  const nodeEntry = findNodeEntry(net, port.node)
  if (nodeEntry === undefined) {
    return undefined
  }

  const portEntry = nodeEntry.ports[port.name]

  const halfEdge = portEntry.connection?.halfEdge
  delete portEntry.connection

  if (halfEdge !== undefined) {
    const halfEdgeEntry = findHalfEdgeEntry(net, halfEdge)
    if (halfEdgeEntry === undefined) {
      throw new Error(`[disconnectPort] Fail to find halfEdgeEntry`)
    }

    delete halfEdgeEntry.port
  }
}
