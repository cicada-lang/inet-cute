import { Checking } from "../checking"
import { compose } from "../compose/compose"
import { Edge } from "../edge"
import { Env } from "../env"
import { findRuleByPorts } from "../mod/findRuleByPorts"
import { deleteHalfEdgeEntry } from "../net/deleteHalfEdgeEntry"
import { deleteNodeEntry } from "../net/deleteNodeEntry"
import { findPortEntryOrFail } from "../net/findPortEntryOrFail"

export type InteractOptions = {
  checking?: Checking
}

export function interact(
  env: Env,
  activeEdge: Edge,
  options: InteractOptions,
): void {
  const rule = findRuleByPorts(env.mod, activeEdge.first, activeEdge.second)

  if (rule === undefined) return

  for (const word of rule.words) {
    compose(rule.mod, env, word, {
      current: {
        first: activeEdge.first.node,
        second: activeEdge.second.node,
      },
      checking: options.checking,
    })
  }

  const firstPortEntry = findPortEntryOrFail(env.net, activeEdge.first)
  const secondPortEntry = findPortEntryOrFail(env.net, activeEdge.second)

  if (firstPortEntry.connection !== undefined) {
    deleteHalfEdgeEntry(env.net, firstPortEntry.connection.halfEdge)
  }

  if (secondPortEntry.connection !== undefined) {
    deleteHalfEdgeEntry(env.net, secondPortEntry.connection.halfEdge)
  }

  deleteNodeEntry(env.net, activeEdge.first.node)
  deleteNodeEntry(env.net, activeEdge.second.node)
}
