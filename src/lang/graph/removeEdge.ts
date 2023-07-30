import { Edge } from "./Edge"
import { Net } from "./Net"

export function removeEdge(net: Net, edge: Edge): void {
  const index = net.edges.indexOf(edge)
  if (index !== -1) {
    net.edges.splice(index, 1)
  }
}
