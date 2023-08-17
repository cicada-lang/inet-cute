import { Edge } from "../edge"
import { formatNode } from "../node/formatNode"
import { Net } from "./Net"
import { allEdges } from "./allEdges"

export function formatNet(net: Net): string {
  return allEdges(net).map(formatEdge).join("\n")
}

function formatEdge(edge: Edge): string {
  const first = formatNode(edge.first.node)
  const second = formatNode(edge.second.node)

  if (edge.first.isPrincipal && edge.second.isPrincipal) {
    return `(${first})-${edge.first.name}!${edge.second.name}-(${second})`
  } else {
    return `(${first})-${edge.first.name} ${edge.second.name}-(${second})`
  }
}
