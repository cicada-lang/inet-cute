import * as Definitions from "../definitions"
import { Mod } from "../mod"
import { define } from "../mod/define"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class DefnetStmt extends Stmt {
  constructor(
    public name: string,
    public words: Array<Word>,
    public span: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    define(
      mod,
      this.name,
      new Definitions.NetDefinition(mod, this.name, this.words),
    )
  }
}
