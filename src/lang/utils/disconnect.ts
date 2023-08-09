import { Edge } from "../edge"
import { Env } from "../env"
import { removeEdge } from "./removeEdge"

export function disconnect(env: Env, edge: Edge): void {
  removeEdge(env, edge)

  // Be careful about memory leak.
  delete edge.first.connection
  delete edge.second.connection
}
