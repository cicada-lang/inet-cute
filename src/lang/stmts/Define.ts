import { checkWords } from "../check/checkWords"
import { definitionMaybeSpan } from "../definition/definitionMaybeSpan"
import { appendReport } from "../errors/appendReport"
import { createReport } from "../errors/createReport"
import { Mod } from "../mod"
import { findDefinitionOrFail } from "../mod/findDefinitionOrFail"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class Define implements Stmt {
  constructor(
    public name: string,
    public words: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    try {
      const definition = findDefinitionOrFail(mod, this.name)
      if (definition["@kind"] !== "WordDefinition") {
        throw new Error(
          [
            `[Define.execute] I expect a WordDefinition.`,
            ``,
            `  definition kind: ${definition["@kind"]}`,
          ].join("\n"),
        )
      }

      if (definition.words !== undefined) {
        const definitionSpan = definitionMaybeSpan(definition)

        throw createReport({
          message: [
            `[Define.execute] I already defined word.`,
            ``,
            `  word: ${this.name}`,
          ].join("\n"),
          context: definitionSpan
            ? { span: definitionSpan, text: mod.text }
            : undefined,
        })
      }

      definition.words = this.words
      definition.span = this.span

      // First define the word, then check,
      // so that the definition can be recursive.
      checkWords(mod, definition.input, definition.output, this.words)
    } catch (error) {
      throw appendReport(error, {
        message: [
          `[Define.execute] I fail to define word.`,
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
