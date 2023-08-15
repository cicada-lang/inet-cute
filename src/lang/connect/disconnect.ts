import { Edge } from "../edge"
import { Net } from "../net"
import { deletePortConnection } from "../net/deletePortConnection"
import { removeEdge } from "../net/removeEdge"

export function disconnect(net: Net, edge: Edge): void {
  removeEdge(net, edge)

  // Be careful about memory leak.
  deletePortConnection(net, edge.first)
  deletePortConnection(net, edge.second)
}
