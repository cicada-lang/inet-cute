import { Span } from "@cicada-lang/sexp/lib/span"
import { Exp } from "../exp"
import { Module } from "../module"
import { Net } from "../net"

export class Call extends Exp {
  constructor(public name: string, public span: Span) {
    super()
  }

  apply(mod: Module, net: Net): void {
    const found = net.portStore.get(this.name)
    if (found !== undefined) {
      net.portStore.delete(this.name)
      net.portStack.push(found)
    } else {
      mod.getDefOrFail(this.name).refer(net)
    }
  }
}
