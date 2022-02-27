import { Def } from "../def"
import { Module } from "../module"
import { Net } from "../net"

export class NetDef extends Def {
  constructor(
    public mod: Module,
    public name: string,
    public defs: Array<Def>
  ) {
    super()
  }

  apply(net: Net): void {
    for (const def of this.defs) {
      def.apply(net)
    }
  }
}
