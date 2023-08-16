import { formatNode } from "../node/formatNode"
import { Net } from "./Net"
import { allEdges } from "./allEdges"

export function formatNet(net: Net): string {
  const lines: Array<string> = []

  for (const edge of allEdges(net)) {
    const first = formatNode(edge.first.node)
    const second = formatNode(edge.second.node)

    if (edge.first.isPrincipal && edge.second.isPrincipal) {
      lines.push(
        `(${first})-${edge.first.name}!${edge.second.name}-(${second})`,
      )
    } else {
      lines.push(
        `(${first})-${edge.first.name} ${edge.second.name}-(${second})`,
      )
    }
  }

  return lines.join("\n")
}
