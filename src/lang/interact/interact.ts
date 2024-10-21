import { type Checking } from "../checking/index.js"
import { compose } from "../compose/compose.js"
import { type Edge } from "../edge/index.js"
import { type Env } from "../env/index.js"
import { findRuleByPorts } from "../mod/findRuleByPorts.js"
import { deleteNodeEntry } from "../net/deleteNodeEntry.js"

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

  deleteNodeEntry(env.net, activeEdge.first.node)
  deleteNodeEntry(env.net, activeEdge.second.node)
}
