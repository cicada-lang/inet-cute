import { Mod } from "../mod"
import { Rule } from "../rule"
import { Span } from "../span"
import { Stmt } from "../stmt"
import { Word } from "../word"

export class DefruleStmt extends Stmt {
  constructor(
    public start: string,
    public end: string,
    public words: Array<Word>,
    public span: Span,
  ) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    const startNodeDef = mod.getNodeDefOrFail(this.start)
    const endNodeDef = mod.getNodeDefOrFail(this.end)

    startNodeDef.defineRule(
      endNodeDef,
      new Rule(mod, startNodeDef, endNodeDef, this.words),
    )
  }
}
