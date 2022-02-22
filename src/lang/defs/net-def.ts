import { Def } from "../def"
import { Module } from "../module"
import { Net } from "../net"

export class NetDef extends Def {
  constructor(public mod: Module, public words: Array<string>) {
    super()
  }

  execute(net: Net): void {
    for (const word of this.words) {
      this.mod.apply(net, word)
    }
  }
}
