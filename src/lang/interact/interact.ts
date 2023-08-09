import { Checking } from "../checking"
import { compose } from "../compose/compose"
import { ActiveEdge } from "../edge"
import { Env } from "../env"
import { Mod } from "../mod"
import { removeEdgesOfNode } from "../utils/removeEdgesOfNode"

export type InteractOptions = {
  checking?: Checking
}

export function interact(
  mod: Mod,
  env: Env,
  activeEdge: ActiveEdge,
  options: InteractOptions,
): void {
  removeEdgesOfNode(env, activeEdge.second.node)
  removeEdgesOfNode(env, activeEdge.first.node)

  for (const word of activeEdge.rule.words) {
    compose(mod, env, word, {
      current: {
        first: activeEdge.first.node,
        second: activeEdge.second.node,
      },
      checking: options.checking,
    })
  }
}
