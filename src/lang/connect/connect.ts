import { checkPortSigns } from "../check/checkPortSigns"
import { Net } from "../net"
import { findPortEntry } from "../net/findPortEntry"
import { findPortRecordOrFail } from "../net/findPortRecordOrFail"
import { Port } from "../port"
import { formatPort } from "../port/formatPort"

export function connect(net: Net, first: Port, second: Port): void {
  const firstPortEntry = findPortEntry(net, first)

  if (firstPortEntry?.connection !== undefined) {
    throw new Error(
      [
        `[connect] The first port is already connected.`,
        ``,
        `  first port: ${formatPort(net, first)}`,
        `  first connected port: ${formatPort(
          net,
          firstPortEntry.connection.port,
        )}`,
        `  second port: ${formatPort(net, second)}`,
      ].join("\n"),
    )
  }

  const secondPortEntry = findPortEntry(net, second)

  if (secondPortEntry?.connection !== undefined) {
    throw new Error(
      [
        `[connect] The second port is already connected.`,
        ``,
        `  first port: ${formatPort(net, first)}`,
        `  second port: ${formatPort(net, second)}`,
        `  second connected port: ${formatPort(
          net,
          secondPortEntry.connection.port,
        )}`,
      ].join("\n"),
    )
  }

  checkPortSigns(net, first, second)

  const edge = { first, second }

  const firstPortRecord = findPortRecordOrFail(net, first.node)
  firstPortRecord[first.name].connection = { port: second }

  const secondPortRecord = findPortRecordOrFail(net, second.node)
  secondPortRecord[second.name].connection = { port: first }

  if (first.isPrincipal && second.isPrincipal) {
    net.activeEdges.push(edge)
  }
}
