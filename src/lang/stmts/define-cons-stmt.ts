import { Span } from "@cicada-lang/sexp/lib/span"
import * as Defs from "../defs"
import { Mod } from "../mod"
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

  async execute(mod: Mod): Promise<void> {
    mod.define(
      this.name,
      new Defs.NodeDef(
        mod,
        this.name,
        buildTypes(Array(this.inputArity).fill("Any")),
        buildTypes([...Array(this.outputArity).fill("Any"), "*"])
      )
    )
  }
}
