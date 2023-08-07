import { Env } from "../env"
import { Port } from "../graph/Port"
import { lookupRuleByPorts } from "../mod/lookupRuleByPorts"

export function connect(env: Env, start: Port, end: Port): void {
  const rule = lookupRuleByPorts(env.mod, start, end)

  if (start.connection !== undefined) {
    throw new Error(`[connect] The start port is already connected`)
  }

  if (end.connection !== undefined) {
    throw new Error(`[connect] The end port is already connected`)
  }

  if (rule !== undefined) {
    const edge = { start, end, rule }
    start.connection = { edge, port: end }
    end.connection = { edge, port: start }
    env.activeEdges.push(edge)
  } else {
    const edge = { start, end }
    start.connection = { edge, port: end }
    end.connection = { edge, port: start }
    env.edges.push(edge)
  }
}
