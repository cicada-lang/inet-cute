import { Net } from "../graph"
import { Mod } from "../mod"
import { Span } from "../span"
import { Word } from "../word"

export class Let implements Word {
  constructor(
    public name: string,
    public span: Span,
  ) {}

  apply(mod: Mod, net: Net): void {
    const found = net.portStore.get(this.name)
    if (found !== undefined) {
      throw new Error(
        `Fail to save port to variable ${this.name}, ` +
          `because the variable is used.`,
      )
    }

    const port = net.portStack.pop()
    if (port === undefined) {
      throw new Error(
        `Fail to save port to variable ${this.name}, ` +
          `because the local port store is empty.`,
      )
    }

    net.portStore.set(this.name, port)
  }
}
