import { composeWords } from "../compose/composeWords"
import { createEnv } from "../env/createEnv"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class Begin implements Stmt {
  constructor(
    public words: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    const env = createEnv(mod)
    composeWords(mod, env, this.words, {})
  }
}
