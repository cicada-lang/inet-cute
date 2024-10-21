import { checkWords } from "../check/checkWords.js"
import { appendReport } from "../errors/appendReport.js"
import { type Mod } from "../mod/index.js"
import { type Span } from "../span/index.js"
import { type Stmt } from "../stmt/index.js"
import { type Word } from "../word/index.js"

// Just like unnamed `claim` + `define`.

export class Check implements Stmt {
  constructor(
    public input: Array<Word>,
    public output: Array<Word>,
    public words: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      checkWords(mod, this.input, this.output, this.words)
    } catch (error) {
      throw appendReport(error, {
        message: `[Check.execute] I fail to check.`,
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
