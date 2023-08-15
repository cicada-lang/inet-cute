import { Net } from "../net"
import { Node } from "../node"
import { deleteEdge } from "./deleteEdge"
import { findPortEntry } from "./findPortEntry"

export function deleteEdgesOfNode(net: Net, node: Node): void {
  for (const port of node.input) {
    const portEntry = findPortEntry(net, port)
    portEntry?.connection && deleteEdge(net, portEntry.connection.edge)
  }

  for (const port of node.output) {
    const portEntry = findPortEntry(net, port)
    portEntry?.connection && deleteEdge(net, portEntry.connection.edge)
  }
}
