import { createCtx } from "../ctx/createCtx"
import { cutWordDefinition } from "../cut/cutWordDefinition"
import { appendReport } from "../errors/appendReport"
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
    try {
      const definition = lookupWordDefinitionOrFail(mod, this.name)

      if (definition.words !== undefined) {
        throw new Error(
          `[Define.execute] I can not re-define word: ${this.name}`,
        )
        // TODO It is already defined to ...
      }

      definition.words = this.words

      const ctx = createCtx()
      cutWordDefinition(ctx, definition, {})
    } catch (error) {
      throw appendReport(error, {
        message: `[Define.execute] I fail to define word: ${this.name}`,
        context: {
          span: this.span,
          text: mod.text,
        },
      })
    }
  }
}
