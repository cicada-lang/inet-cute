import { Edge, Net } from "../graph"

export function netRemoveEdge(net: Net, edge: Edge): void {
  const index = net.edges.indexOf(edge)
  if (index !== -1) {
    net.edges.splice(index, 1)
  }
}
