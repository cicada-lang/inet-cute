import { compose } from "../compose/compose"
import { Env } from "../env"
import { removeNodeAndEdges } from "../env/removeNodeAndEdges"
import { ActiveEdge } from "../graph"
import { Mod } from "../mod"

export function interact(mod: Mod, env: Env, activeEdge: ActiveEdge): void {
  removeNodeAndEdges(env, activeEdge.end.node)
  removeNodeAndEdges(env, activeEdge.start.node)

  for (const word of activeEdge.rule.words) {
    compose(mod, env, word, {
      current: {
        start: activeEdge.start.node,
        end: activeEdge.end.node,
      },
    })
  }
}
