import { Net } from "../lang/graph"
import { formatNode } from "./formatNode"

export class NetRenderer {
  async render(net: Net): Promise<string> {
    const dot = this.renderToDot(net)
    return dot
  }

  renderToDot(net: Net): string {
    const lines: Array<string> = []

    for (const edge of net.activeEdges) {
      const start = formatNode(edge.start.node)
      const end = formatNode(edge.end.node)
      lines.push(`(${start})-${edge.start.name}!${edge.end.name}-(${end})`)
    }

    for (const edge of net.edges) {
      const start = formatNode(edge.start.node)
      const end = formatNode(edge.end.node)
      lines.push(`(${start})-${edge.start.name} ${edge.end.name}-(${end})`)
    }

    for (const port of net.portStack) {
      lines.push(`(${formatNode(port.node)})-${port.name}`)
    }

    return lines.join("\n")
  }
}
