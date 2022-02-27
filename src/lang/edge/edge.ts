import { Net } from "../net"
import { Port } from "../port"
import { Rule } from "../rule"

export class Edge {
  start: Port
  end: Port

  constructor(start: Port, end: Port) {
    // TODO check port type.

    this.start = start
    this.end = end

    start.edge = this
    end.edge = this
  }
}

export class Action extends Edge {
  rule: Rule

  constructor(start: Port, end: Port, rule: Rule) {
    super(start, end)
    this.rule = rule
  }

  act(net: Net): void {
    const input: Array<Port> = []
    const output: Array<Port> = []

    // NOTE We should disconnect `end` first, then `start`.
    this.end.node.disconnect(net, input, output)
    this.start.node.disconnect(net, input, output)

    net.ports.push(...input)

    this.rule.reconnect(net)

    if (net.ports.length !== output.length) {
      throw new Error(
        [
          `Internal error, resulting ports doesn't match prepared output ports`,
          `  resulting ports length: ${net.ports.length}`,
          `  prepared output ports length: ${output.length}`,
        ].join("\n")
      )
    }

    while (net.ports.length > 0) {
      const start = net.ports.pop() as Port
      const end = output.pop() as Port
      net.connectPorts(start, end)
    }
  }
}
