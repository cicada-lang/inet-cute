import { createCtx } from "../ctx/createCtx"
import { cutWords } from "../cut/cutWords"
import * as Definitions from "../definition"
import { Mod } from "../mod"
import { define } from "../mod/define"
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

    define(
      mod,
      this.name,
      Definitions.NetDefinition(mod, this.name, this.words),
    )
  }
}
