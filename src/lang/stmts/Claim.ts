import { definitionMaybeSpan } from "../definition/definitionMaybeSpan"
import { appendReport } from "../errors/appendReport"
import { createReport } from "../errors/createReport"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { lookupDefinition } from "../mod/lookupDefinition"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { SignedType } from "../type"
import { checkType } from "../type/checkType"

export class Claim implements Stmt {
  constructor(
    public name: string,
    public input: Array<SignedType>,
    public output: Array<SignedType>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      this.input.map(({ t }) => checkType(mod, t))
      this.output.map(({ t }) => checkType(mod, t))

      const definition = lookupDefinition(mod, this.name)

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
        kind: "WordDefinition",
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
