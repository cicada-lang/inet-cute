import * as Defs from "../definitions"
import { Module } from "../module"
import { Stmt, StmtMeta } from "../stmt"
import { buildTypes } from "../types"

export class DefineElimStmt extends Stmt {
  constructor(
    public name: string,
    public inputArity: number,
    public outputArity: number,
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
        buildTypes([...Array(this.inputArity).fill("Any"), "*"]),
        buildTypes(Array(this.outputArity).fill("Any"))
      )
    )
  }
}
