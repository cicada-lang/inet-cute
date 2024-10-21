import { checkPortSigns } from "../check/checkPortSigns.js"
import { findPortEntry } from "../net/findPortEntry.js"
import { findPortRecordOrFail } from "../net/findPortRecordOrFail.js"
import { type Net } from "../net/index.js"
import { type Port } from "../port/index.js"
import { formatValue } from "../value/formatValue.js"

export function connect(net: Net, first: Port, second: Port): void {
  const firstPortEntry = findPortEntry(net, first)

  if (firstPortEntry?.connection !== undefined) {
    throw new Error(
      [
        `[connect] The first port is already connected.`,
        ``,
        `  first port: ${formatValue(first)}`,
        `  first connected port: ${formatValue(
          firstPortEntry.connection.port,
        )}`,
        `  second port: ${formatValue(second)}`,
      ].join("\n"),
    )
  }

  const secondPortEntry = findPortEntry(net, second)

  if (secondPortEntry?.connection !== undefined) {
    throw new Error(
      [
        `[connect] The second port is already connected.`,
        ``,
        `  first port: ${formatValue(first)}`,
        `  second port: ${formatValue(second)}`,
        `  second connected port: ${formatValue(
          secondPortEntry.connection.port,
        )}`,
      ].join("\n"),
    )
  }

  checkPortSigns(first, second)

  const edge = { first, second }

  const firstPortRecord = findPortRecordOrFail(net, first.node)
  firstPortRecord[first.name].connection = { port: second }

  const secondPortRecord = findPortRecordOrFail(net, second.node)
  secondPortRecord[second.name].connection = { port: first }

  if (first.isPrincipal && second.isPrincipal) {
    net.activeEdges.push(edge)
  }
}
