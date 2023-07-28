import { Net } from "../lang/net"

export class NetRenderer {
  async render(net: Net): Promise<string> {
    const dot = this.renderToDot(net)
    return dot
  }

  renderToDot(net: Net): string {
    const lines: Array<string> = []

    for (const edge of net.edges) {
      const start = edge.start.node.format()
      const end = edge.end.node.format()
      const indexes = `${edge.end.index}-${edge.start.index}`
      lines.push(`"${end}" -- "${start}" [label="${indexes}"];`)
      lines.push(`"${start}";`)
      lines.push(`"${end}";`)
    }

    for (const edge of net.actions) {
      const start = edge.start.node.format()
      const end = edge.end.node.format()
      const indexes = `${edge.end.index}-${edge.start.index}`
      lines.push(`"${end}" -- "${start}" [label="${indexes}" color=red];`)
      lines.push(`"${start}";`)
      lines.push(`"${end}";`)
    }

    for (const port of net.portStack) {
      const start = port.node.format()
      const end = port.format()
      lines.push(`"${end}" -- "${start}";`)
      lines.push(`"${start}";`)
      lines.push(`"${end}";`)
    }

    const body = lines.join(" ")

    return `graph { ${body} }`
  }
}
