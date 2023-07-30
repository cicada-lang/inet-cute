import { Net } from "../graph"
import { findPortInActiveEdge } from "../graph/findPortInActiveEdge"
import { netConnectPorts } from "../graph/netConnectPorts"
import { Mod } from "../mod"
import { Span } from "../span"
import { Word, WordOptions } from "../word"

export class PortConnect implements Word {
  constructor(
    public nodeName: string,
    public portName: string,
    public span: Span,
  ) {}

  apply(mod: Mod, net: Net, options: WordOptions): void {
    const { activeEdge } = options

    if (activeEdge === undefined) {
      throw new Error(`[PortConnect.apply] expect current activeEdge`)
    }

    const found = findPortInActiveEdge(this.nodeName, this.portName, activeEdge)

    if (found === undefined) {
      throw new Error(
        `[PortConnect.apply] can not find port: ${this.portName} in active edge`,
      )
    }

    const topPort = net.portStack.pop()

    if (topPort === undefined) {
      throw new Error(`[PortConnect.apply] expect top port`)
    }

    netConnectPorts(net, topPort, found)
  }
}
