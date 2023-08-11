import { checkPortSigns } from "../check/checkPortSigns"
import { Env } from "../env"
import { lookupRuleByPorts } from "../mod/lookupRuleByPorts"
import { Port } from "../port"
import { formatValue } from "../value/formatValue"

export function connect(env: Env, first: Port, second: Port): void {
  if (first.connection !== undefined) {
    throw new Error(
      [
        `[connect] The first port is already connected.`,
        ``,
        `  first port: ${formatValue(first)}`,
        `  second port: ${formatValue(second)}`,
      ].join("\n"),
    )
  }

  if (second.connection !== undefined) {
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
    first.connection = { edge, port: second }
    second.connection = { edge, port: first }
    env.activeEdges.push(edge)
  } else {
    const edge = { first, second }
    first.connection = { edge, port: second }
    second.connection = { edge, port: first }
    env.edges.push(edge)
  }
}
