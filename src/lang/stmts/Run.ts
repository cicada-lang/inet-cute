import { formatNet } from "../format"
import { createNet } from "../graph/createNet"
import { run } from "../graph/run"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class Run implements Stmt {
  constructor(
    public words: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    const net = createNet(mod)

    for (const word of this.words) {
      word.apply(mod, net)
    }

    run(net)

    console.log(formatNet(net))
    console.log()
  }
}
