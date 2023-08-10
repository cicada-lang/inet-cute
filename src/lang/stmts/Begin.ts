import { createChecking } from "../checking/createChecking"
import { composeWords } from "../compose/composeWords"
import { createEnv } from "../env/createEnv"
import { appendReport } from "../errors/appendReport"
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
    try {
      const env = createEnv(mod)
      composeWords(mod, env, this.words, {
        checking: createChecking(),
      })
    } catch (error) {
      throw appendReport(error, {
        message: `[Begin.execute] I fail to begin.`,
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
