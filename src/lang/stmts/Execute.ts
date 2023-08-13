import { compose } from "../compose/compose.js"
import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"
import { formatWord } from "../word/formatWord.js"

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
          `[Compose.execute] I fail to define word.`,
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
