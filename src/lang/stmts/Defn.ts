import * as Definitions from "../definition"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class Defn implements Stmt {
  constructor(
    public name: string,
    public words: Array<Word>,
    public span: Span,
  ) {}

  async execute(mod: Mod): Promise<void> {
    define(
      mod,
      this.name,
      Definitions.NetDefinition(mod, this.name, this.words),
    )
  }
}
