import { composeWords } from "../compose/composeWords"
import { createCtx } from "../ctx/createCtx"
import { cutWords } from "../cut/cutWords"
import { createEnv } from "../env/createEnv"
import { formatNetFromEnv } from "../env/formatNetFromEnv"
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

    const env = createEnv(mod)
    composeWords(mod, env, this.words, {})

    console.log(formatNetFromEnv(env))
    console.log()
  }
}
