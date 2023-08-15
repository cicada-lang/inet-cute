import { formatNode } from "../node/formatNode"
import { Net } from "./Net"

export function formatNet(net: Net): string {
  const lines: Array<string> = []

  for (const edge of [...net.activeEdges].reverse()) {
    const first = formatNode(edge.first.node)
    const second = formatNode(edge.second.node)
    lines.push(`(${first})-${edge.first.name}!${edge.second.name}-(${second})`)
  }

  for (const edge of [...net.edges].reverse()) {
    const first = formatNode(edge.first.node)
    const second = formatNode(edge.second.node)
    lines.push(`(${first})-${edge.first.name} ${edge.second.name}-(${second})`)
  }

  return lines.join("\n")
}
