import { Env } from "../env"
import { formatNode } from "../node/formatNode"

export function formatNetFromEnv(env: Env): string {
  const lines: Array<string> = []

  for (const edge of [...env.activeEdges].reverse()) {
    const first = formatNode(edge.first.node)
    const second = formatNode(edge.second.node)
    lines.push(`(${first})-${edge.first.name}!${edge.second.name}-(${second})`)
  }

  for (const edge of [...env.edges].reverse()) {
    const first = formatNode(edge.first.node)
    const second = formatNode(edge.second.node)
    lines.push(`(${first})-${edge.first.name} ${edge.second.name}-(${second})`)
  }

  for (const value of env.stack) {
    if (value["@kind"] === "Port") {
      lines.push(`(${formatNode(value.node)})-${value.name}`)
    }
  }

  return lines.join("\n")
}
