import { composeWords } from "../compose/composeWords"
import { createCtx } from "../ctx/createCtx"
import { cutWords } from "../cut/cutWords"
import { Mod } from "../mod"
import { createNet } from "../net/createNet"
import { formatNet } from "../net/formatNet"
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
    const ctx = createCtx()
    cutWords(mod, ctx, this.words, {})

    const net = createNet(mod)
    composeWords(mod, net, this.words, {})

    run(net)

    console.log(formatNet(net))
    console.log()
  }
}
