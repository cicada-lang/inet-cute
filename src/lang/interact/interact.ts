import { Checking } from "../checking"
import { compose } from "../compose/compose"
import { Edge } from "../edge"
import { Env } from "../env"
import { lookupRuleByPorts } from "../mod/lookupRuleByPorts"
import { deleteEdgesOfNode } from "../net/deleteEdgesOfNode"
import { deleteNodePortEntries } from "../net/deleteNodePortEntries"

export type InteractOptions = {
  checking?: Checking
}

export function interact(
  env: Env,
  activeEdge: Edge,
  options: InteractOptions,
): void {
  const rule = lookupRuleByPorts(activeEdge.first, activeEdge.second)
  if (rule === undefined) return

  deleteEdgesOfNode(env.net, activeEdge.first.node)
  deleteEdgesOfNode(env.net, activeEdge.second.node)

  for (const word of rule.words) {
    compose(rule.mod, env, word, {
      current: {
        first: activeEdge.first.node,
        second: activeEdge.second.node,
      },
      checking: options.checking,
    })
  }

  deleteNodePortEntries(env.net, activeEdge.first.node)
  deleteNodePortEntries(env.net, activeEdge.second.node)
}
