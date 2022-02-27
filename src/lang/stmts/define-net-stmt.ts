import { Definition } from "../definition"
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
    mod.defineNet(this.name, this.words)
  }
}
