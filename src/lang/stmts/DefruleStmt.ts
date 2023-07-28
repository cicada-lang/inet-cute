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
    const startNodeDefinition = mod.lookupNodeDefinitionOrFail(this.start)
    const endNodeDefinition = mod.lookupNodeDefinitionOrFail(this.end)

    startNodeDefinition.defineRule(
      endNodeDefinition,
      new Rule(mod, startNodeDefinition, endNodeDefinition, this.words),
    )
  }
}
