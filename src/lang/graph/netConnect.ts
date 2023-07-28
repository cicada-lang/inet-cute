import { Action, Net, Port, createEdge } from "../graph"

export function netConnect(net: Net, start: Port, end: Port): void {
  const rule = net.mod.lookupRuleByPorts(start, end)

  if (rule) {
    net.actions.push(new Action(start, end, rule))
  } else {
    net.edges.push(createEdge(start, end))
  }
}
