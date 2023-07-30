import { Net, Port, createEdge } from "."
import { lookupRuleByPorts } from "../mod/lookupRuleByPorts"
import { createActiveEdge } from "./createActiveEdge"

export function netConnectPorts(net: Net, start: Port, end: Port): void {
  const rule = lookupRuleByPorts(net.mod, start, end)

  if (rule !== undefined) {
    net.activeEdges.push(createActiveEdge(start, end, rule))
  } else {
    net.edges.push(createEdge(start, end))
  }
}
