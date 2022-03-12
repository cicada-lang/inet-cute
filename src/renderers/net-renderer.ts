import { Net } from "../lang/net"
import { DotRenderer } from "./dot-renderer"

export class NetRenderer {
  dotRenderer = new DotRenderer()

  async render(net: Net): Promise<string> {
    const dot = this.renderToDot(net)
    return await this.dotRenderer.render(dot)
  }

  renderToDot(net: Net): string {
    const lines: Array<string> = []

    const nodeAttributes = `penwidth=1`
    const edgeAttributes = `penwidth=1`

    for (const edge of net.edges) {
      const start = edge.start.node.format()
      const end = edge.end.node.format()
      const indexes = `${edge.start.index}-${edge.end.index}`
      lines.push(
        `"${start}" -- "${end}" [${edgeAttributes}, label="${indexes}"];`
      )
      lines.push(`"${start}" [${nodeAttributes}];`)
      lines.push(`"${end}" [${nodeAttributes}];`)
    }

    for (const edge of net.actions) {
      const start = edge.start.node.format()
      const end = edge.end.node.format()
      const indexes = `${edge.start.index}-${edge.end.index}`
      lines.push(
        `"${start}" -- "${end}" [${edgeAttributes}, label="${indexes}", color=red, penwidth=2];`
      )
      lines.push(`"${start}" [${nodeAttributes}];`)
      lines.push(`"${end}" [${nodeAttributes}];`)
    }

    for (const port of net.ports) {
      const start = port.node.format()
      const end = port.format()
      lines.push(`"${start}" -- "${end}" [${edgeAttributes}];`)
      lines.push(`"${start}" [${nodeAttributes}];`)
      lines.push(`"${end}" [shape=none, height=0, width=0];`)
    }

    const body = lines.join(" ")
    return `graph { ${body} }`
  }
}
