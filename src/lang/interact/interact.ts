import { Checking } from "../checking"
import { compose } from "../compose/compose"
import { ActiveEdge } from "../edge"
import { Env } from "../env"
import { Mod } from "../mod"
import { removeNodeAndEdges } from "../utils/removeNodeAndEdges"

export type InteractOptions = {
  checking?: Checking
}

export function interact(
  mod: Mod,
  env: Env,
  activeEdge: ActiveEdge,
  options: InteractOptions,
): void {
  removeNodeAndEdges(env, activeEdge.end.node)
  removeNodeAndEdges(env, activeEdge.start.node)

  for (const word of activeEdge.rule.words) {
    compose(mod, env, word, {
      current: {
        start: activeEdge.start.node,
        end: activeEdge.end.node,
      },
      checking: options.checking,
    })
  }
}
