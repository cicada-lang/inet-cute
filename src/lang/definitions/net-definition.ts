import { Definition } from "../definition"
import { Module } from "../module"
import { Net } from "../net"

export class NetDefinition extends Definition {
  constructor(
    public mod: Module,
    public name: string,
    public defs: Array<Definition>
  ) {
    super()
  }

  apply(net: Net): void {
    for (const def of this.defs) {
      def.apply(net)
    }
  }
}
