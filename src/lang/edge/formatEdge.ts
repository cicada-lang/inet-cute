import { type Edge } from "../edge/index.js"
import { formatNode } from "../node/formatNode.js"

export function formatEdge(edge: Edge): string {
  const first = formatNode(edge.first.node)
  const second = formatNode(edge.second.node)

  if (edge.first.isPrincipal && edge.second.isPrincipal) {
    return `(${first})-${edge.first.name}!${edge.second.name}-(${second})`
  } else {
    return `(${first})-${edge.first.name} ${edge.second.name}-(${second})`
  }
}
