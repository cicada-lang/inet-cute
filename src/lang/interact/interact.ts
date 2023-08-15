import { Checking } from "../checking"
import { compose } from "../compose/compose"
import { ActiveEdge } from "../edge"
import { Env } from "../env"
import { deleteEdgesOfNode } from "../net/deleteEdgesOfNode"
import { deleteNodePortEntries } from "../net/deleteNodePortEntries"

export type InteractOptions = {
  checking?: Checking
}

export function interact(
  env: Env,
  activeEdge: ActiveEdge,
  options: InteractOptions,
): void {
  deleteEdgesOfNode(env.net, activeEdge.first.node)
  deleteEdgesOfNode(env.net, activeEdge.second.node)

  for (const word of activeEdge.rule.words) {
    compose(activeEdge.rule.mod, env, word, {
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
