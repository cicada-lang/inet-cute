import { composeWords } from "../compose/composeWords"
import { createCtx } from "../ctx/createCtx"
import { cutWords } from "../cut/cutWords"
import { createEnv } from "../env/createEnv"
import { formatEnv } from "../env/formatEnv"
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
    const ctx = createCtx()
    cutWords(mod, ctx, this.words, {})

    const env = createEnv(mod)
    composeWords(mod, env, this.words, {})

    run(env)

    console.log(formatEnv(env))
    console.log()
  }
}
