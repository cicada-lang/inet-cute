import * as Definitions from "../definition"
import { definitionMaybeSpan } from "../definition/definitionMaybeSpan"
import { appendReport } from "../errors/appendReport"
import { createReport } from "../errors/createReport"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { lookupDefinition } from "../mod/lookupDefinition"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Type } from "../type"
import { checkType } from "../type/checkType"

export class Claim implements Stmt {
  constructor(
    public name: string,
    public input: Array<Type>,
    public output: Array<Type>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      this.input.map((t) => checkType(mod, t))
      this.output.map((t) => checkType(mod, t))

      const definition = lookupDefinition(mod, this.name)

      if (definition !== undefined) {
        const definitionSpan = definitionMaybeSpan(definition)
        throw createReport({
          message: `[Claim.execute] I already claimed word: ${this.name}`,
          context: definitionSpan
            ? { span: definitionSpan, text: mod.text }
            : undefined,
        })
      }

      define(
        mod,
        this.name,
        Definitions.WordDefinition(
          mod,
          this.span,
          this.name,
          this.input,
          this.output,
        ),
      )
    } catch (error) {
      throw appendReport(error, {
        message: `[Claim.execute] I fail to claim word: ${this.name}`,
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
