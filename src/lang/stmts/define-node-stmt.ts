import * as Defs from "../definitions"
import { Module } from "../module"
import { Stmt, StmtMeta } from "../stmt"
import { Type } from "../type"

export class DefineNodeStmt extends Stmt {
  constructor(
    public name: string,
    public input: Array<string>,
    public output: Array<string>,
    public meta: StmtMeta
  ) {
    super()
  }

  async execute(mod: Module): Promise<void> {
    mod.define(
      this.name,
      new Defs.NodeDefinition(
        mod,
        this.name,
        Type.build(this.input),
        Type.build(this.output)
      )
    )
  }
}
