import { Env } from "../env"
import { Edge } from "../graph/Edge"
import { removeEdge } from "./removeEdge"

export function disconnect(net: Env, edge: Edge): void {
  removeEdge(net, edge)

  // Be careful about memory leak.
  delete edge.start.connection
  delete edge.end.connection
}
