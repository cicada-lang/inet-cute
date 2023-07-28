import { Def } from "../def"
import { Exp } from "../exp"
import { Net } from "../graph"
import { Mod } from "../mod"

export class NetDef extends Def {
  constructor(
    public mod: Mod,
    public name: string,
    public exps: Array<Exp>,
  ) {
    super()
  }

  refer(net: Net): void {
    for (const exp of this.exps) {
      exp.apply(this.mod, net)
    }
  }
}
