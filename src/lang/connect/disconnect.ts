import { Edge } from "../edge"
import { Net } from "../net"
import { deleteEdge } from "../net/deleteEdge"
import { deletePortConnection } from "../net/deletePortConnection"

export function disconnect(net: Net, edge: Edge): void {
  deleteEdge(net, edge)

  // Be careful about memory leak.
  deletePortConnection(net, edge.first)
  deletePortConnection(net, edge.second)
}
