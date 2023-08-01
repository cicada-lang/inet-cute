import { createCtx } from "../ctx/createCtx"
import { cutWords } from "../cut/cutWords"
import { Mod } from "../mod"
import { defineRule } from "../mod/defineRule"
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
    cutWords(mod, ctx, this.words)

    defineRule(mod, this.start, this.end, this.words)
  }
}
