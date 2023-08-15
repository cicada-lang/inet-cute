import { Net } from "../net"
import { Node } from "../node"
import { deleteEdge } from "./deleteEdge"
import { findPortEntry } from "./findPortEntry"
import { nodeInputPorts } from "./nodeInputPorts"
import { nodeOutputPorts } from "./nodeOutputPorts"

export function deleteEdgesOfNode(net: Net, node: Node): void {
  for (const port of nodeInputPorts(net, node)) {
    const portEntry = findPortEntry(net, port)
    portEntry?.connection && deleteEdge(net, portEntry.connection.edge)
  }

  for (const port of nodeOutputPorts(net, node)) {
    const portEntry = findPortEntry(net, port)
    portEntry?.connection && deleteEdge(net, portEntry.connection.edge)
  }
}
