import { ActiveEdge, Net, Node, Port } from "../graph"
import { Mod } from "../mod"
import { Span } from "../span"
import { Word, WordOptions } from "../word"

export class PortPush implements Word {
  constructor(
    public nodeName: string,
    public portName: string,
    public span: Span,
  ) {}

  apply(mod: Mod, net: Net, options: WordOptions): void {
    const { activeEdge } = options

    if (activeEdge === undefined) {
      throw new Error(`[PortPush.apply] expect current activeEdge`)
    }

    const found = findPortInActiveEdge(this.nodeName, this.portName, activeEdge)

    if (found !== undefined) {
      net.portStack.push(found)
    }
  }
}

function findPortInActiveEdge(
  nodeName: string,
  portName: string,
  activeEdge: ActiveEdge,
): Port | undefined {
  if (nodeName === activeEdge.start.node.name) {
    return findPortInNode(portName, activeEdge.start.node)
  }

  if (nodeName === activeEdge.end.node.name) {
    return findPortInNode(portName, activeEdge.end.node)
  }
}

function findPortInNode(portName: string, node: Node): Port | undefined {
  for (const port of node.input) {
    if (port.name === portName) {
      return port
    }
  }

  for (const port of node.output) {
    if (port.name === portName) {
      return port
    }
  }
}
