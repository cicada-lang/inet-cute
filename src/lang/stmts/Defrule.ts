import { createCtx } from "../ctx/createCtx"
import { cutWords } from "../cut/cutWords"
import { Mod } from "../mod"
import { defineRule } from "../mod/defineRule"
import { lookupNodeDefinitionOrFail } from "../mod/lookupNodeDefinitionOrFail"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class Defrule implements Stmt {
  constructor(
    public start: string,
    public end: string,
    public words: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    const ctx = createCtx()

    const start = lookupNodeDefinitionOrFail(mod, this.start)
    const end = lookupNodeDefinitionOrFail(mod, this.end)

    cutWords(mod, ctx, this.words, {
      current: { start, end },
    })

    defineRule(mod, this.start, this.end, this.words)
  }
}
