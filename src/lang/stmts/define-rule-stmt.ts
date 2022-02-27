import { Module } from "../module"
import { Stmt, StmtMeta } from "../stmt"

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
    mod.defineRule(this.start, this.end, this.words)
  }
}
