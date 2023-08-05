import { createCtx } from "../ctx/createCtx"
import { cutWords } from "../cut/cutWords"
import { createReport } from "../errors/createReport"
import { Mod } from "../mod"
import { lookupWordDefinitionOrFail } from "../mod/lookupWordDefinitionOrFail"
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
    const ctx = createCtx()
    cutWords(mod, ctx, this.words, {})

    try {
      const definition = lookupWordDefinitionOrFail(mod, this.name)

      if (definition.words !== undefined) {
        throw new Error(
          `[Define.execute] I can not re-define word: ${this.name}`,
        )
        // TODO It is already defined to ...
      }

      definition.words = this.words
    } catch (error) {
      throw createReport(error, {
        message: `[Define.execute] I fail to define word: ${this.name}`,
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
