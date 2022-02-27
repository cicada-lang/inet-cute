import { Definition } from "../definition"
import { Module } from "../module"
import { Stmt } from "../stmt"

export class DefNodeStmt extends Stmt {
  constructor(public name: string, public def: (mod: Module) => Definition) {
    super()
  }

  async execute(mod: Module): Promise<void> {
    mod.define(this.name, this.def(mod))
  }
}
