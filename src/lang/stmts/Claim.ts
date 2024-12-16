import { definitionMaybeSpan } from "../definition/definitionMaybeSpan.ts"
import { appendReport } from "../errors/appendReport.ts"
import { createReport } from "../errors/createReport.ts"
import { define } from "../mod/define.ts"
import { findDefinition } from "../mod/findDefinition.ts"
import { type Mod } from "../mod/index.ts"
import { type Span } from "../span/index.ts"
import { type Stmt } from "../stmt/index.ts"
import { type Word } from "../word/index.ts"

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
