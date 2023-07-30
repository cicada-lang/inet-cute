import { Net } from "../graph"
import { findPortInActiveEdge } from "../graph/findPortInActiveEdge"
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

    if (found === undefined) {
      throw new Error(
        `[PortPush.apply] can not find port: ${this.portName} in active edge`,
      )
    }

    if (found.connection !== undefined) {
      console.log(found.connection)
    }
    delete found.connection

    net.portStack.push(found)
  }
}
