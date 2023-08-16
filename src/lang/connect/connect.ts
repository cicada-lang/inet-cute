import { checkPortSigns } from "../check/checkPortSigns"
import { Net } from "../net"
import { findNodePortRecordOrFail } from "../net/findNodePortRecordOrFail"
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

  const edge = { first, second }

  const firstNodePortRecord = findNodePortRecordOrFail(net, first.node)
  firstNodePortRecord[first.name].connection = { edge, port: second }

  const secondNodePortRecord = findNodePortRecordOrFail(net, second.node)
  secondNodePortRecord[second.name].connection = { edge, port: first }

  if (first.isPrincipal && second.isPrincipal) {
    net.activeEdges.push(edge)
  } else {
    net.edges.push(edge)
  }
}
