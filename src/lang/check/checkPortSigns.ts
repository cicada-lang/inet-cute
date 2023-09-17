import { Net } from "../net"
import { Port } from "../port"
import { formatPort } from "../port/formatPort"

export function checkPortSigns(net: Net, first: Port, second: Port): void {
  if (first.sign === 1 && second.sign === 1) {
    throw new Error(
      [
        `[checkSigns] I expect the two ports to have opposite signs,`,
        `  but they all have positive sign.`,
        ``,
        `  first port: ${formatPort(net, first)}`,
        `  second port: ${formatPort(net, second)}`,
      ].join("\n"),
    )
  }

  if (first.sign === -1 && second.sign === -1) {
    throw new Error(
      [
        `[checkSigns] I expect the two ports to have opposite signs,`,
        `  but they all have negative sign.`,
        ``,
        `  first port: ${formatPort(net, first)}`,
        `  second port: ${formatPort(net, second)}`,
      ].join("\n"),
    )
  }
}
