import { composeWords } from "../compose/composeWords"
import { createEnv } from "../env/createEnv"
import { formatNetFromEnv } from "../env/formatNetFromEnv"
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
    const env = createEnv(mod)
    composeWords(mod, env, this.words, {})

    run(env)

    console.log(formatNetFromEnv(env))
    console.log()
  }
}
