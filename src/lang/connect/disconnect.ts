import { Edge } from "../edge"
import { Net } from "../net"
import { removeEdge } from "../net/removeEdge"

export function disconnect(net: Net, edge: Edge): void {
  removeEdge(net, edge)

  // Be careful about memory leak.
  delete edge.first.connection
  delete edge.second.connection
}
