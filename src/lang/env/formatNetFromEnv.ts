import { Env } from "."
import { formatNode } from "../node/formatNode"

export function formatNetFromEnv(env: Env): string {
  const lines: Array<string> = []

  for (const edge of [...env.activeEdges].reverse()) {
    const start = formatNode(edge.start.node)
    const end = formatNode(edge.end.node)
    lines.push(`(${start})-${edge.start.name}!${edge.end.name}-(${end})`)
  }

  for (const edge of [...env.edges].reverse()) {
    const start = formatNode(edge.start.node)
    const end = formatNode(edge.end.node)
    lines.push(`(${start})-${edge.start.name} ${edge.end.name}-(${end})`)
  }

  for (const value of env.stack) {
    if (value.kind === "Port") {
      lines.push(`(${formatNode(value.node)})-${value.name}`)
    }
  }

  return lines.join("\n")
}
