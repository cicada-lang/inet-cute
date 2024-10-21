import { compose } from "../compose/compose.js"
import { appendReport } from "../errors/appendReport.js"
import { type Mod } from "../mod/index.js"
import { type Span } from "../span/index.js"
import { type Stmt } from "../stmt/index.js"
import { formatWord } from "../word/formatWord.js"
import { type Word } from "../word/index.js"

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
