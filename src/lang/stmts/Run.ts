import { composeWords } from "../compose/composeWords"
import { formatNet } from "../format"
import { createNet } from "../graph/createNet"
import { Mod } from "../mod"
import { run } from "../run/run"
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
    composeWords(mod, net, this.words)
    run(net)
    console.log(formatNet(net))
    console.log()
  }
}
