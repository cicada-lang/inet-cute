import * as Defs from "../defs"
import { Exp } from "../exp"
import { Mod } from "../mod"
import { Span } from "../span"
import { Stmt } from "../stmt"

export class DefineNetStmt extends Stmt {
  constructor(public name: string, public exps: Array<Exp>, public span: Span) {
    super()
  }

  async execute(mod: Mod): Promise<void> {
    // TODO Type check the exps.
    mod.define(this.name, new Defs.NetDef(mod, this.name, this.exps))
  }
}
