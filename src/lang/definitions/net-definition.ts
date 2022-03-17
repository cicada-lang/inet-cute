import { Definition } from "../definition"
import { Exp } from "../exp"
import { Module } from "../module"
import { Net } from "../net"

export class NetDefinition extends Definition {
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
