import * as Defs from "../definitions"
import { Exp } from "../exp"
import { Module } from "../module"
import { Stmt, StmtMeta } from "../stmt"

export class DefineNetStmt extends Stmt {
  constructor(
    public name: string,
    public exps: Array<Exp>,
    public meta: StmtMeta
  ) {
    super()
  }

  async execute(mod: Module): Promise<void> {
    // TODO Type check the exps.
    mod.define(this.name, new Defs.NetDefinition(mod, this.name, this.exps))
  }
}
