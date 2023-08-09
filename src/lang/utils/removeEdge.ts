import { Edge } from "../edge"
import { Env } from "../env"

export function removeEdge(env: Env, edge: Edge): void {
  const index = env.edges.indexOf(edge)
  if (index !== -1) {
    env.edges.splice(index, 1)
  }
}
