import { Ctx } from "../ctx"
import { findPortInActiveEdge } from "../graph/findPortInActiveEdge"
import { Mod } from "../mod"
import { Net } from "../net"
import { connect } from "../net/connect"
import { disconnect } from "../net/disconnect"
import { Span } from "../span"
import { ComposeOptions, CutOptions, Word } from "../word"

export class PortReconnect implements Word {
  constructor(
    public nodeName: string,
    public portName: string,
    public span: Span,
  ) {}

  compose(mod: Mod, net: Net, options?: ComposeOptions): void {
    const { activeEdge } = options || {}

    if (activeEdge === undefined) {
      throw new Error(`[PortReconnect.compose] expect current activeEdge`)
    }

    const found = findPortInActiveEdge(this.nodeName, this.portName, activeEdge)

    if (found === undefined) {
      throw new Error(
        `[PortReconnect.compose] can not find port: ${this.portName} in active edge`,
      )
    }

    if (found.connection === undefined) {
      throw new Error(
        `[PortReconnect.compose] I expect the found port to have connection`,
      )
    }

    disconnect(net, found.connection.edge)

    const topPort = net.ports.pop()

    if (topPort === undefined) {
      throw new Error(`[PortReconnect.compose] expect top port`)
    }

    connect(net, topPort, found)
  }

  cut(mod: Mod, ctx: Ctx, options?: CutOptions): void {
    //
  }
}
