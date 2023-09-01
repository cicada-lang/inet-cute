import { definitionMaybeSpan } from "../definition/definitionMaybeSpan"
import { appendReport } from "../errors/appendReport"
import { createReport } from "../errors/createReport"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { findDefinition } from "../mod/findDefinition"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

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
