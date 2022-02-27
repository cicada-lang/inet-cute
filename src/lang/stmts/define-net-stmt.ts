import * as Defs from "../definitions"
import { Module } from "../module"
import { Stmt, StmtMeta } from "../stmt"

export class DefineNetStmt extends Stmt {
  constructor(
    public name: string,
    public words: Array<string>,
    public meta: StmtMeta
  ) {
    super()
  }

  async execute(mod: Module): Promise<void> {
    // TODO Type check the words.
    mod.define(
      this.name,
      new Defs.NetDefinition(
        mod,
        this.name,
        this.words.map((word) => mod.getDefOrFail(word))
      )
    )
  }
}
