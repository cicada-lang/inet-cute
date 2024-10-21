import { checkRule } from "../check/checkRule.js"
import { checkRuleIsAboutOwnNode } from "../check/checkRuleIsAboutOwnNode.js"
import { checkRuleNodeOrder } from "../check/checkRuleNodeOrder.js"
import { appendReport } from "../errors/appendReport.js"
import { defineRule } from "../mod/defineRule.js"
import { type Mod } from "../mod/index.js"
import { type Span } from "../span/index.js"
import { type Stmt } from "../stmt/index.js"
import { type Word } from "../word/index.js"

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
