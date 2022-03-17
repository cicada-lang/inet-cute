import { Exp } from "../exp"
import { Module } from "../module"
import { Net } from "../net"

export class Call extends Exp {
  constructor(public name: string) {
    super()
  }

  apply(mod: Module, net: Net): void {
    return mod.getDefOrFail(this.name).apply(net)
  }
}
