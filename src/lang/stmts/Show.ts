import { composeWords } from "../compose/composeWords"
import { createCtx } from "../ctx/createCtx"
import { cutWords } from "../cut/cutWords"
import { createEnv } from "../env/createEnv"
import { formatEnv } from "../env/formatEnv"
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
    const ctx = createCtx()
    cutWords(mod, ctx, this.words, {})

    const net = createEnv(mod)
    composeWords(mod, net, this.words, {})

    console.log(formatEnv(net))
    console.log()
  }
}
