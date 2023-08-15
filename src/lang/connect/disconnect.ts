import { Edge } from "../edge"
import { Net } from "../net"
import { deleteConnection } from "../net/deleteConnection"
import { deleteEdge } from "../net/deleteEdge"

export function disconnect(net: Net, edge: Edge): void {
  deleteEdge(net, edge)

  // Be careful about memory leak.
  deleteConnection(net, edge.first)
  deleteConnection(net, edge.second)
}
