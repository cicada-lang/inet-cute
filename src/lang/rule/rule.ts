import { Module } from "../module"
import { Net } from "../net"

export class Rule {
  constructor(
    public mod: Module,
    public disconnect: [string, string],
    public reconnectWords: Array<string>
  ) {}

  // NOTE Do side effect on net.
  reconnect(net: Net): void {
    for (const word of this.reconnectWords) {
      this.mod.apply(net, word)
    }
  }
}
