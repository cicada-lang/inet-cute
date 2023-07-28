import { InternalError } from "../errors"
import { Net, Node, Port } from "../graph"
import { Mod } from "../mod"
import { Rule } from "../rule"
import { netRemoveEdge } from "./netRemoveEdge"
import { netRemoveNode } from "./netRemoveNode"

export class Action {
  constructor(
    public start: Port,
    public end: Port,
    public rule: Rule,
  ) {}

  act(mod: Mod, net: Net): void {
    // NOTE The state of action.
    const input: Array<Port> = []
    const output: Array<Port> = []

    disconnectNode(net, this.end.node, input, output)
    disconnectNode(net, this.start.node, input, output)

    net.portStack.push(...input)

    // NOTE Reconnect by rule.
    for (const word of this.rule.words) {
      word.apply(mod, net)
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
  netRemoveNode(net, node)
}

function disconnectInput(
  net: Net,
  ports: Array<Port>,
  input: Array<Port>,
): void {
  for (const port of ports) {
    if (!port.isPrincipal) {
      if (port.connection === undefined) {
        throw new InternalError(
          "I meet a port without connection during disconnecting input.",
        )
      }

      input.push(port.connection.port)
      netRemoveEdge(net, port.connection.edge)
    }
  }
}

function disconnectOutput(
  net: Net,
  ports: Array<Port>,
  output: Array<Port>,
): void {
  for (const port of ports) {
    if (!port.isPrincipal) {
      if (port.connection === undefined) {
        throw new InternalError(
          "I meet a port without connection during disconnecting output.",
        )
      }

      output.unshift(port.connection.port)
      netRemoveEdge(net, port.connection.edge)
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
