import { Net, Port } from "."
import { lookupRuleByPorts } from "../mod/lookupRuleByPorts"

export function connect(net: Net, start: Port, end: Port): void {
  const rule = lookupRuleByPorts(net.mod, start, end)

  if (rule !== undefined) {
    const edge = { start, end, rule }
    start.connection = { edge, port: end }
    end.connection = { edge, port: start }
    net.activeEdges.push(edge)
  } else {
    const edge = { start, end }
    start.connection = { edge, port: end }
    end.connection = { edge, port: start }
    net.edges.push(edge)
  }
}
