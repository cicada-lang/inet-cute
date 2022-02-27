import { Module } from "../module"
import { Stmt, StmtMeta } from "../stmt"
import { Rule } from "../rule"
import * as Defs from "../definitions"

export class DefineRuleStmt extends Stmt {
  constructor(
    public start: string,
    public end: string,
    public words: Array<string>,
    public meta: StmtMeta
  ) {
    super()
  }

  async execute(mod: Module): Promise<void> {
    const startNodeDef = mod.getNodeDefOrFail(this.start)
    const endNodeDef = mod.getNodeDefOrFail(this.end)

    startNodeDef.defineRule(
      endNodeDef,
      new Rule(
        mod,
        startNodeDef,
        endNodeDef,
        this.words.map((word) => mod.getDefOrFail(word))
      )
    )
  }
}
