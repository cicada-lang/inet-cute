export class Rule {
  disconnect: [string, string]
  reconnect: Array<string>

  constructor(disconnect: [string, string], reconnect: Array<string>) {
    this.disconnect = disconnect
    this.reconnect = reconnect
  }
}
