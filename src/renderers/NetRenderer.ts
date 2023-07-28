import { Net } from "../lang/net"
import { formatNode } from "./formatNode"

export class NetRenderer {
  async render(net: Net): Promise<string> {
    const dot = this.renderToDot(net)
    return dot
  }

  renderToDot(net: Net): string {
    const lines: Array<string> = []

    for (const edge of net.edges) {
      const start = formatNode(edge.start.node)
      const end = formatNode(edge.end.node)
      const indexes = `${edge.end.index}-${edge.start.index}`
      lines.push(`"${end}" -- "${start}" [label="${indexes}"];`)
      lines.push(`"${start}";`)
      lines.push(`"${end}";`)
    }

    for (const edge of net.actions) {
      const start = formatNode(edge.start.node)
      const end = formatNode(edge.end.node)
      const indexes = `${edge.end.index}-${edge.start.index}`
      lines.push(`"${end}" -- "${start}" [label="${indexes}" color=red];`)
      lines.push(`"${start}";`)
      lines.push(`"${end}";`)
    }

    for (const port of net.portStack) {
      const start = formatNode(port.node)
      const end = `${formatNode(port.node)}(${port.index})`
      lines.push(`"${end}" -- "${start}";`)
      lines.push(`"${start}";`)
      lines.push(`"${end}";`)
    }

    const body = lines.join(" ")

    return `graph { ${body} }`
  }
}
