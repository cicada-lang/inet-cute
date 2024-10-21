import { definitionMaybeSpan } from "../definition/definitionMaybeSpan.js"
import { appendReport } from "../errors/appendReport.js"
import { createReport } from "../errors/createReport.js"
import { define } from "../mod/define.js"
import { findDefinition } from "../mod/findDefinition.js"
import { type Mod } from "../mod/index.js"
import { type Span } from "../span/index.js"
import { type Stmt } from "../stmt/index.js"
import { type Word } from "../word/index.js"

export class Claim implements Stmt {
  constructor(
    public name: string,
    public input: Array<Word>,
    public output: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      const definition = findDefinition(mod, this.name)

      if (definition !== undefined) {
        const definitionSpan = definitionMaybeSpan(definition)

        throw createReport({
          message: [
            `[Claim.execute] I already claimed/defined word.`,
            ``,
            `  word: ${this.name}`,
          ].join("\n"),
          context: definitionSpan
            ? { span: definitionSpan, text: mod.text }
            : undefined,
        })
      }

      define(mod, this.name, {
        "@type": "Definition",
        "@kind": "WordDefinition",
        mod,
        span: this.span,
        name: this.name,
        input: this.input,
        output: this.output,
      })
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[Claim.execute] I fail to claim word.`,
          ``,
          `  word: ${this.name}`,
        ].join("\n"),
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
