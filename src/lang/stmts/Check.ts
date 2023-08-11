import { checkWords } from "../check/checkWords"
import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

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
