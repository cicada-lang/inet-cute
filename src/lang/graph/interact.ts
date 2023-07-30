import { ActiveEdge, Net, Node } from "../graph"
import { Mod } from "../mod"
import { removeEdge } from "./removeEdge"
import { removeNode } from "./removeNode"

export function interact(mod: Mod, net: Net, activeEdge: ActiveEdge): void {
  disconnectNode(net, activeEdge.end.node)
  disconnectNode(net, activeEdge.start.node)

  for (const word of activeEdge.rule.words) {
    word.apply(mod, net, { activeEdge })
  }
}

function disconnectNode(net: Net, node: Node): void {
  for (const port of node.input) {
    port.connection && removeEdge(net, port.connection.edge)
  }

  for (const port of node.output) {
    port.connection && removeEdge(net, port.connection.edge)
  }

  removeNode(net, node)
}
