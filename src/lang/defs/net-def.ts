import { Def } from "../def"
import { Exp } from "../exp"
import { Module } from "../module"
import { Net } from "../net"

export class NetDef extends Def {
  constructor(
    public mod: Module,
    public name: string,
    public exps: Array<Exp>
  ) {
    super()
  }

  apply(net: Net): void {
    for (const exp of this.exps) {
      exp.apply(this.mod, net)
    }
  }
}
