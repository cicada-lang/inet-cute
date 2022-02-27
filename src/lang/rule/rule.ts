import { Def } from "../def"
import * as Defs from "../defs"
import { Module } from "../module"
import { Net } from "../net"

export class Rule {
  constructor(
    public mod: Module,
    public start: Defs.NodeDef,
    public end: Defs.NodeDef,
    public defs: Array<Def>
  ) {}

  // NOTE Do side effect on net.
  reconnect(net: Net): void {
    for (const def of this.defs) {
      def.apply(net)
    }
  }
}
