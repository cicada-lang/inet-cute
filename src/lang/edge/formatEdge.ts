import { Edge } from "../edge"
import { Net } from "../net"
import { formatNode } from "../node/formatNode"

export function formatEdge(net: Net, edge: Edge): string {
  const first = formatNode(net, edge.first.node)
  const second = formatNode(net, edge.second.node)

  if (edge.first.isPrincipal && edge.second.isPrincipal) {
    return `(${first})-${edge.first.name}!${edge.second.name}-(${second})`
  } else {
    return `(${first})-${edge.first.name} ${edge.second.name}-(${second})`
  }
}
