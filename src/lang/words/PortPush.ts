import { findPortInNodes } from "../graph/findPortInActiveEdge"
import { Mod } from "../mod"
import { Net } from "../net"
import { disconnect } from "../net/disconnect"
import { Span } from "../span"
import { ComposeOptions, Word } from "../word"

export class PortPush implements Word {
  constructor(
    public nodeName: string,
    public portName: string,
    public span: Span,
  ) {}

  compose(mod: Mod, net: Net, options?: ComposeOptions): void {
    const { current } = options || {}

    if (current === undefined) {
      throw new Error(`[PortPush.compose] expect current activeEdge`)
    }

    const found = findPortInNodes(this.nodeName, this.portName, [
      current.start,
      current.end,
    ])

    if (found === undefined) {
      throw new Error(
        `[PortPush.compose] can not find port: ${this.portName} in active edge`,
      )
    }

    if (found.connection === undefined) {
      throw new Error(
        `[PortPush.compose] I expect the found port to have connection`,
      )
    }

    disconnect(net, found.connection.edge)

    net.ports.push(found)
  }
}
