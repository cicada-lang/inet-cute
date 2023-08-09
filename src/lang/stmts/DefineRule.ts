import { checkRule } from "../check/checkRule"
import { appendReport } from "../errors/appendReport"
import { Mod } from "../mod"
import { defineRule } from "../mod/defineRule"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class DefineRule implements Stmt {
  constructor(
    public first: string,
    public second: string,
    public words: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      checkRule(mod, this.first, this.second, this.words)
      defineRule(mod, this.first, this.second, this.words)
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[DefineRule.execute] I fail to define rule.`,
          ``,
          `  rule nodes: ${this.first} ${this.second}`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
