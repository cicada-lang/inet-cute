import { Env } from "../env"
import { formatNode } from "../node/formatNode"

export function formatNetFromEnv(env: Env): string {
  const lines: Array<string> = []

  for (const edge of [...env.activeEdges].reverse()) {
    const start = formatNode(edge.first.node)
    const end = formatNode(edge.second.node)
    lines.push(`(${start})-${edge.first.name}!${edge.second.name}-(${end})`)
  }

  for (const edge of [...env.edges].reverse()) {
    const start = formatNode(edge.first.node)
    const end = formatNode(edge.second.node)
    lines.push(`(${start})-${edge.first.name} ${edge.second.name}-(${end})`)
  }

  for (const value of env.stack) {
    if (value["@kind"] === "Port") {
      lines.push(`(${formatNode(value.node)})-${value.name}`)
    }
  }

  return lines.join("\n")
}
