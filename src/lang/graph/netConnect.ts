import { ActiveEdge, Net, Port, createEdge } from "../graph"
import { lookupRuleByPorts } from "../mod/lookupRuleByPorts"

export function netConnect(net: Net, start: Port, end: Port): void {
  const rule = lookupRuleByPorts(net.mod, start, end)

  if (rule) {
    net.activeEdges.push(new ActiveEdge(start, end, rule))
  } else {
    net.edges.push(createEdge(start, end))
  }
}
