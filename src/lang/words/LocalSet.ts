import { Net } from "../graph"
import { Mod } from "../mod"
import { Span } from "../span"
import { Word } from "../word"

export class LocalSet implements Word {
  constructor(
    public name: string,
    public span: Span,
  ) {}

  compose(mod: Mod, net: Net): void {
    const port = net.ports.pop()
    if (port === undefined) {
      throw new Error(
        `[LocalSet.compose] expect a port on the top of the stack`,
      )
    }

    net.localPorts.set(this.name, port)
  }
}
