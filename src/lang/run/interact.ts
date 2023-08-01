import { ActiveEdge } from "../graph"
import { Mod } from "../mod"
import { Net } from "../net"
import { removeNodeAndEdges } from "../net/removeNodeAndEdges"

export function interact(mod: Mod, net: Net, activeEdge: ActiveEdge): void {
  removeNodeAndEdges(net, activeEdge.end.node)
  removeNodeAndEdges(net, activeEdge.start.node)

  for (const word of activeEdge.rule.words) {
    word.compose(mod, net, { activeEdge })
  }
}
