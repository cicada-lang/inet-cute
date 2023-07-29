import { Net, Port, createEdge } from "../graph"
import { lookupRuleByPorts } from "../mod/lookupRuleByPorts"
import { createActiveEdge } from "./createActiveEdge"

export function netConnect(net: Net, start: Port, end: Port): void {
  const rule = lookupRuleByPorts(net.mod, start, end)

  if (rule) {
    net.activeEdges.push(createActiveEdge(start, end, rule))
  } else {
    net.edges.push(createEdge(start, end))
  }
}
