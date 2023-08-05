import { createCtx } from "../ctx/createCtx"
import { cutWords } from "../cut/cutWords"
import { Mod } from "../mod"
import { lookupWordDefinitionOrFail } from "../mod/lookupWordDefinitionOrFail"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class Define implements Stmt {
  constructor(
    public name: string,
    public definedWords: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    const ctx = createCtx()
    cutWords(mod, ctx, this.definedWords, {})

    const definition = lookupWordDefinitionOrFail(mod, this.name)

    if (definition.definedWords !== undefined) {
      throw new Error(`[Define.execute] I can not re-define word: ${this.name}`)
      // TODO It is already defined to ...
    }

    definition.definedWords = this.definedWords
  }
}
