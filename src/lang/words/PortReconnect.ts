import { Net } from "../graph"
import { connect } from "../graph/connect"
import { findPortInActiveEdge } from "../graph/findPortInActiveEdge"
import { Mod } from "../mod"
import { Span } from "../span"
import { Word, WordOptions } from "../word"

export class PortReconnect implements Word {
  constructor(
    public nodeName: string,
    public portName: string,
    public span: Span,
  ) {}

  apply(mod: Mod, net: Net, options: WordOptions): void {
    const { activeEdge } = options

    if (activeEdge === undefined) {
      throw new Error(`[PortReconnect.apply] expect current activeEdge`)
    }

    const found = findPortInActiveEdge(this.nodeName, this.portName, activeEdge)

    if (found === undefined) {
      throw new Error(
        `[PortReconnect.apply] can not find port: ${this.portName} in active edge`,
      )
    }

    const topPort = net.portStack.pop()

    if (topPort === undefined) {
      throw new Error(`[PortReconnect.apply] expect top port`)
    }

    connect(net, topPort, found)
  }
}