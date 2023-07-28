import { Net } from "../graph"
import { Mod } from "../mod"
import { Span } from "../span"
import { Word } from "../word"

export class Let extends Word {
  constructor(
    public names: Array<string>,
    public span: Span,
  ) {
    super()
  }

  apply(mod: Mod, net: Net): void {
    for (const name of [...this.names].reverse()) {
      this.applyName(mod, net, name)
    }
  }

  private applyName(mod: Mod, net: Net, name: string): void {
    const found = net.portStore.get(name)
    if (found !== undefined) {
      throw new Error(
        `Fail to save port to variable ${name}, because the variable is used.`,
      )
    }

    const port = net.portStack.pop()
    if (port === undefined) {
      throw new Error(
        `Fail to save port to variable ${name}, because the port store is empty.`,
      )
    }

    net.portStore.set(name, port)
  }
}
