import { Stmt } from "../stmt"
import { Def } from "../def"
import { Module } from "../module"

export class DefNodeStmt extends Stmt {
  constructor(public name: string, public def: (mod: Module) => Def) {
    super()
  }

  async execute(mod: Module): Promise<void> {
    mod.define(this.name, this.def(mod))
  }
}
