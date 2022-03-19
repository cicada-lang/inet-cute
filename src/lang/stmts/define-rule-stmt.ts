import { Exp } from "../exp"
import { Mod } from "../mod"
import { Rule } from "../rule"
import { Span } from "../span"
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

  async execute(mod: Mod): Promise<void> {
    const startNodeDef = mod.getNodeDefOrFail(this.start)
    const endNodeDef = mod.getNodeDefOrFail(this.end)

    startNodeDef.defineRule(
      endNodeDef,
      new Rule(mod, startNodeDef, endNodeDef, this.exps)
    )
  }
}
