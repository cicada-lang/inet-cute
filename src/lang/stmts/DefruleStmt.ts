import { Mod } from "../mod"
import { modLookupNodeDefinitionOrFail } from "../mod/modLookupNodeDefinitionOrFail"
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
    const startNodeDefinition = modLookupNodeDefinitionOrFail(mod, this.start)
    const endNodeDefinition = modLookupNodeDefinitionOrFail(mod, this.end)

    startNodeDefinition.defineRule(
      endNodeDefinition,
      new Rule(mod, startNodeDefinition, endNodeDefinition, this.words),
    )
  }
}
