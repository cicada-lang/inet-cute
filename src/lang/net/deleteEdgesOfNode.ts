import { Net } from "../net"
import { Node } from "../node"
import { deleteEdge } from "./deleteEdge"
import { findInputPorts } from "./findInputPorts"
import { findOutputPorts } from "./findOutputPorts"
import { findPortEntry } from "./findPortEntry"

export function deleteEdgesOfNode(net: Net, node: Node): void {
  for (const port of findInputPorts(net, node)) {
    const portEntry = findPortEntry(net, port)
    portEntry?.connection && deleteEdge(net, portEntry.connection.edge)
  }

  for (const port of findOutputPorts(net, node)) {
    const portEntry = findPortEntry(net, port)
    portEntry?.connection && deleteEdge(net, portEntry.connection.edge)
  }
}
