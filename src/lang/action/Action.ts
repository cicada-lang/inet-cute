import { Edge } from "../edge"
import { InternalError } from "../errors"
import { Mod } from "../mod"
import { Net } from "../net"
import { Node } from "../node"
import { Port } from "../port"
import { Rule } from "../rule"

export class Action extends Edge {
  rule: Rule

  constructor(start: Port, end: Port, rule: Rule) {
    super(start, end)
    this.rule = rule
  }

  act(mod: Mod, net: Net): void {
    // NOTE The state of action.
    const input: Array<Port> = []
    const output: Array<Port> = []

    disconnectNode(net, this.end.node, input, output)
    disconnectNode(net, this.start.node, input, output)

    net.portStack.push(...input)

    // NOTE Reconnect by rule.
    for (const exp of this.rule.exps) {
      exp.apply(mod, net)
    }

    reconnectOutput(net, output)
  }
}

function disconnectNode(
  net: Net,
  node: Node,
  input: Array<Port>,
  output: Array<Port>,
): void {
  disconnectInput(net, node.input, input)
  disconnectOutput(net, node.output, output)
  net.removeNode(node)
}

function disconnectInput(
  net: Net,
  ports: Array<Port>,
  input: Array<Port>,
): void {
  for (const port of ports) {
    if (!port.isPrincipal()) {
      if (port.connection === undefined) {
        throw new InternalError(
          "I meet a port without connection during disconnecting input.",
        )
      }

      input.push(port.connection.port)
      net.removeEdge(port.connection.edge)
    }
  }
}

function disconnectOutput(
  net: Net,
  ports: Array<Port>,
  output: Array<Port>,
): void {
  for (const port of ports) {
    if (!port.isPrincipal()) {
      if (port.connection === undefined) {
        throw new InternalError(
          "I meet a port without connection during disconnecting output.",
        )
      }

      output.unshift(port.connection.port)
      net.removeEdge(port.connection.edge)
    }
  }
}

function reconnectOutput(net: Net, output: Array<Port>): void {
  if (net.portStack.length !== output.length) {
    throw new InternalError(
      [
        `Resulting ports doesn't match prepared output ports`,
        `  resulting ports length: ${net.portStack.length}`,
        `  prepared output ports length: ${output.length}`,
      ].join("\n"),
    )
  }

  while (net.portStack.length > 0) {
    const start = net.portStack.pop() as Port
    const end = output.pop() as Port
    net.connect(start, end)
  }
}
