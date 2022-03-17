import { Span } from "@cicada-lang/sexp/lib/span"
import * as Defs from "../definitions"
import { Module } from "../module"
import { Stmt } from "../stmt"
import { buildTypes } from "../types"

export class DefineConsStmt extends Stmt {
  constructor(
    public name: string,
    public inputArity: number,
    public outputArity: number,
    public span: Span
  ) {
    super()
  }

  async execute(mod: Module): Promise<void> {
    mod.define(
      this.name,
      new Defs.NodeDefinition(
        mod,
        this.name,
        buildTypes(Array(this.inputArity).fill("Any")),
        buildTypes([...Array(this.outputArity).fill("Any"), "*"])
      )
    )
  }
}
