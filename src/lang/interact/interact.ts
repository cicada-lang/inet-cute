import { type Checking } from "../checking/index.ts"
import { compose } from "../compose/compose.ts"
import { type Edge } from "../edge/index.ts"
import { type Env } from "../env/index.ts"
import { findRuleByPorts } from "../mod/findRuleByPorts.ts"
import { deleteNodeEntry } from "../net/deleteNodeEntry.ts"

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
