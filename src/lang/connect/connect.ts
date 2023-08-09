import { Env } from "../env"
import { lookupRuleByPorts } from "../mod/lookupRuleByPorts"
import { Port } from "../port/Port"

export function connect(env: Env, first: Port, second: Port): void {
  const rule = lookupRuleByPorts(env.mod, first, second)

  if (first.connection !== undefined) {
    throw new Error(`[connect] The first port is already connected.`)
  }

  if (second.connection !== undefined) {
    throw new Error(`[connect] The second port is already connected.`)
  }

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
