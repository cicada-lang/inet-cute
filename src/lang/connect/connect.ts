import { checkPortSigns } from "../check/checkPortSigns"
import { lookupRuleByPorts } from "../mod/lookupRuleByPorts"
import { Net } from "../net"
import { findNodePortEntriesOrFail } from "../net/findNodePortEntriesOrFail"
import { findPortEntry } from "../net/findPortEntry"
import { Port } from "../port"
import { formatValue } from "../value/formatValue"

export function connect(net: Net, first: Port, second: Port): void {
  if (findPortEntry(net, first)?.connection !== undefined) {
    throw new Error(
      [
        `[connect] The first port is already connected.`,
        ``,
        `  first port: ${formatValue(first)}`,
        `  second port: ${formatValue(second)}`,
      ].join("\n"),
    )
  }

  if (findPortEntry(net, second)?.connection !== undefined) {
    throw new Error(
      [
        `[connect] The second port is already connected.`,
        ``,
        `  first port: ${formatValue(first)}`,
        `  second port: ${formatValue(second)}`,
      ].join("\n"),
    )
  }

  checkPortSigns(first, second)

  const rule = lookupRuleByPorts(first, second)

  if (rule !== undefined) {
    const edge = { first, second, rule }

    const firstNodePortEntries = findNodePortEntriesOrFail(net, first.node)
    firstNodePortEntries[first.name].connection = { edge, port: second }

    const secondNodePortEntries = findNodePortEntriesOrFail(net, second.node)
    secondNodePortEntries[second.name].connection = { edge, port: first }

    net.activeEdges.push(edge)
  } else {
    const edge = { first, second }

    const firstNodePortEntries = findNodePortEntriesOrFail(net, first.node)
    firstNodePortEntries[first.name].connection = { edge, port: second }

    const secondNodePortEntries = findNodePortEntriesOrFail(net, second.node)
    secondNodePortEntries[second.name].connection = { edge, port: first }

    net.edges.push(edge)
  }
}
