import { Edge } from "../edge"
import { Net } from "../net"

export function removeEdge(net: Net, edge: Edge): void {
  const index = net.edges.indexOf(edge)
  if (index !== -1) {
    net.edges.splice(index, 1)
  }
}
