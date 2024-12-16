import { checkWords } from "../check/checkWords.ts"
import { appendReport } from "../errors/appendReport.ts"
import { type Mod } from "../mod/index.ts"
import { type Span } from "../span/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { type Word } from "../word/index.ts"

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
