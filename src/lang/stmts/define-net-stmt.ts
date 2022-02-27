import { Definition } from "../definition"
import { Module } from "../module"
import { Stmt } from "../stmt"

export class DefineNetStmt extends Stmt {
  constructor(public name: string, public words: Array<string>) {
    super()
  }

  async execute(mod: Module): Promise<void> {
    mod.defineNet(this.name, this.words)
  }
}
