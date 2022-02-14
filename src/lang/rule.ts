import { Net } from "./net"

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
      const operator = net.mod.findOperator(word)
      if (operator !== undefined) {
        operator.execute(net)
      } else {
        const node = net.mod.buildNode(word)
        net.connect(node)
      }
    }
  }
}
