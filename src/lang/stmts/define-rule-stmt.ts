import { Span } from "@cicada-lang/sexp/lib/span"
import { Exp } from "../exp"
import { Module } from "../module"
import { Rule } from "../rule"
import { Stmt } from "../stmt"

export class DefineRuleStmt extends Stmt {
  constructor(
    public start: string,
    public end: string,
    public exps: Array<Exp>,
    public span: Span
  ) {
    super()
  }

  async execute(mod: Module): Promise<void> {
    const startNodeDef = mod.getNodeDefOrFail(this.start)
    const endNodeDef = mod.getNodeDefOrFail(this.end)

    startNodeDef.defineRule(
      endNodeDef,
      new Rule(mod, startNodeDef, endNodeDef, this.exps)
    )
  }
}
