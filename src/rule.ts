import { Net } from "./net"
import { Port } from "./port"

export class Rule {
  disconnect: [string, string]
  reconnectWords: Array<string>

  constructor(disconnect: [string, string], reconnectWords: Array<string>) {
    this.disconnect = disconnect
    this.reconnectWords = reconnectWords
  }

  // NOTE Using two port stacks to do side effect on net.
  reconnect(net: Net, inputPorts: Array<Port>, outputPorts: Array<Port>): void {
    // TODO
  }
}
