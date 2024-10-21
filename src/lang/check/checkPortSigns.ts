import { type Port } from "../port/index.js"
import { formatValue } from "../value/formatValue.js"

export function checkPortSigns(first: Port, second: Port): void {
  if (first.sign === 1 && second.sign === 1) {
    throw new Error(
      [
        `[checkSigns] I expect the two ports to have opposite signs,`,
        `  but they all have positive sign.`,
        ``,
        `  first port: ${formatValue(first)}`,
        `  second port: ${formatValue(second)}`,
      ].join("\n"),
    )
  }

  if (first.sign === -1 && second.sign === -1) {
    throw new Error(
      [
        `[checkSigns] I expect the two ports to have opposite signs,`,
        `  but they all have negative sign.`,
        ``,
        `  first port: ${formatValue(first)}`,
        `  second port: ${formatValue(second)}`,
      ].join("\n"),
    )
  }
}
