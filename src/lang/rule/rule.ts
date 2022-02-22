import { Def } from "../def"
import { Module } from "../module"
import { Net } from "../net"
import * as Defs from "../defs"

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
      def.execute(net)
    }
  }
}
