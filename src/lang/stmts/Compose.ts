import { compose } from "../compose/compose.js"
import { appendReport } from "../errors/appendReport.js"
import { Mod } from "../mod/index.js"
import { Span } from "../span/index.js"
import { Stmt } from "../stmt/index.js"
import { formatWord } from "../word/formatWord.js"
import { Word } from "../word/index.js"

export class Compose implements Stmt {
  constructor(
    public word: Word,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      compose(mod, mod.env, this.word, {})
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
