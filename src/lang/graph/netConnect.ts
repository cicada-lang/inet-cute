import { Action, Net, Port, createEdge } from "../graph"
import { modLookupRuleByPorts } from "../mod/modLookupRuleByPorts"

export function netConnect(net: Net, start: Port, end: Port): void {
  const rule = modLookupRuleByPorts(net.mod, start, end)

  if (rule) {
    net.actions.push(new Action(start, end, rule))
  } else {
    net.edges.push(createEdge(start, end))
  }
}
