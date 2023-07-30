import { formatNet } from "../format"
import { cleanUpWires } from "../graph/cleanUpWires"
import { createNet } from "../graph/createNet"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class Show implements Stmt {
  constructor(
    public words: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    const net = createNet(mod)

    for (const word of this.words) {
      word.apply(mod, net, {})
    }

    cleanUpWires(net)

    console.log(formatNet(net))
  }
}
