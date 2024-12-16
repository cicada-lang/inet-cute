import { compose } from "../compose/compose.ts"
import { appendReport } from "../errors/appendReport.ts"
import { type Mod } from "../mod/index.ts"
import { type Span } from "../span/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { formatWord } from "../word/formatWord.ts"
import { type Word } from "../word/index.ts"

export class Compose implements Stmt {
  constructor(
    public word: Word,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      compose(mod, mod.env, this.word, {
        checking: mod.checking,
      })
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[Compose.execute] I fail to compose word.`,
          ``,
          `  word: ${formatWord(this.word)}`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
