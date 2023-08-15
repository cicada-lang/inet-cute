import { Checking } from "../checking"
import { compose } from "../compose/compose"
import { ActiveEdge } from "../edge"
import { Env } from "../env"
import { removeEdgesOfNode } from "../utils/removeEdgesOfNode"

export type InteractOptions = {
  checking?: Checking
}

export function interact(
  env: Env,
  activeEdge: ActiveEdge,
  options: InteractOptions,
): void {
  removeEdgesOfNode(env.net, activeEdge.second.node)
  removeEdgesOfNode(env.net, activeEdge.first.node)

  for (const word of activeEdge.rule.words) {
    compose(activeEdge.rule.mod, env, word, {
      current: {
        first: activeEdge.first.node,
        second: activeEdge.second.node,
      },
      checking: options.checking,
    })
  }
}
