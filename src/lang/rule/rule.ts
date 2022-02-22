import { Net } from "../net"

export class Rule {
  disconnect: [string, string]
  reconnectWords: Array<string>

  constructor(disconnect: [string, string], reconnectWords: Array<string>) {
    this.disconnect = disconnect
    this.reconnectWords = reconnectWords
  }

  // NOTE Do side effect on net.
  reconnect(net: Net): void {
    for (const word of this.reconnectWords) {
      net.mod.apply(net, word)
    }
  }
}
