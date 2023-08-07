import { compose } from "../compose/compose"
import { Env } from "../env"
import { removeNodeAndEdges } from "../env/removeNodeAndEdges"
import { ActiveEdge } from "../graph"
import { Mod } from "../mod"

export function interact(mod: Mod, net: Env, activeEdge: ActiveEdge): void {
  removeNodeAndEdges(net, activeEdge.end.node)
  removeNodeAndEdges(net, activeEdge.start.node)

  for (const word of activeEdge.rule.words) {
    compose(mod, net, word, {
      current: {
        start: activeEdge.start.node,
        end: activeEdge.end.node,
      },
    })
  }
}
