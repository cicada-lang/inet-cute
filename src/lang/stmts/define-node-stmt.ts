import { Definition } from "../definition"
import { Module } from "../module"
import { Stmt } from "../stmt"

export class DefineNodeStmt extends Stmt {
  constructor(
    public name: string,
    public input: Array<string>,
    public output: Array<string>
  ) {
    super()
  }

  async execute(mod: Module): Promise<void> {
    mod.defineNode(this.name, this.input, this.output)
  }
}
