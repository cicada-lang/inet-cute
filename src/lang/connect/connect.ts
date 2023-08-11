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

  checkSigns(first, second)

  const rule = lookupRuleByPorts(env.mod, first, second)

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

function checkSigns(first: Port, second: Port): void {
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
