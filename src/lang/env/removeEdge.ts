import { Env } from "../env"
import { Edge } from "../graph/Edge"

export function removeEdge(net: Env, edge: Edge): void {
  const index = net.edges.indexOf(edge)
  if (index !== -1) {
    net.edges.splice(index, 1)
  }
}
