import { checkRule } from "../check/checkRule.ts"
import { checkRuleIsAboutOwnNode } from "../check/checkRuleIsAboutOwnNode.ts"
import { checkRuleNodeOrder } from "../check/checkRuleNodeOrder.ts"
import { appendReport } from "../errors/appendReport.ts"
import { defineRule } from "../mod/defineRule.ts"
import { type Mod } from "../mod/index.ts"
import { type Span } from "../span/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { type Word } from "../word/index.ts"

export class DefineRule implements Stmt {
  constructor(
    public first: string,
    public second: string,
    public words: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      checkRuleIsAboutOwnNode(mod, this.first, this.second)
      checkRuleNodeOrder(mod, this.first, this.second)
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
