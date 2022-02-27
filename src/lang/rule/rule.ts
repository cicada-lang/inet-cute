import { Definition } from "../definition"
import * as Defs from "../definitions"
import { Module } from "../module"
import { Net } from "../net"

export class Rule {
  constructor(
    public mod: Module,
    public start: Defs.NodeDefinition,
    public end: Defs.NodeDefinition,
    public defs: Array<Definition>
  ) {}

  // NOTE Do side effect on net.
  reconnect(net: Net): void {
    for (const def of this.defs) {
      def.apply(net)
    }
  }
}
