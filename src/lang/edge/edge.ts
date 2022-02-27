import { Net } from "../net"
import { Node } from "../node"
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
    // NOTE The state of action.
    const input: Array<Port> = []
    const output: Array<Port> = []

    // NOTE disconnect by start and end nodes
    //   We should disconnect `end` first, then `start`.
    disconnect(this.end.node, net, input, output)
    disconnect(this.start.node, net, input, output)

    net.ports.push(...input)

    // NOTE reconnect by rule
    for (const def of this.rule.defs) {
      def.apply(net)
    }

    // NOTE reconnect by output queue
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
      const end = output.shift() as Port
      net.connectPorts(start, end)
    }
  }
}

// NOTE Do side effect on two port stacks.
function disconnect(
  node: Node,
  net: Net,
  input: Array<Port>,
  output: Array<Port>
): void {
  for (const port of node.input.filter((port) => !port.isPrincipal())) {
    if (port.edge) {
      if (port.edge.start.node !== node) input.push(port.edge.start)
      if (port.edge.end.node !== node) input.push(port.edge.end)
      net.removeEdge(port.edge)
    }
  }

  for (const port of node.output.filter((port) => !port.isPrincipal())) {
    if (port.edge) {
      if (port.edge.start.node !== node) output.push(port.edge.start)
      if (port.edge.end.node !== node) output.push(port.edge.end)
      net.removeEdge(port.edge)
    }
  }

  net.removeNode(node)
}
