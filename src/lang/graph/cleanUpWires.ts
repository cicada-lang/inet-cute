import { Net } from "./Net"
import { connect } from "./connect"
import { removeEdge } from "./removeEdge"
import { removeNode } from "./removeNode"

export function cleanUpWires(net: Net): void {
  for (const wire of net.wires) {
    if (wire.start.connection && wire.end.connection) {
      removeEdge(net, wire.start.connection.edge)
      removeEdge(net, wire.end.connection.edge)

      removeNode(net, wire.start.node)
      removeNode(net, wire.end.node)

      connect(net, wire.start.connection.port, wire.end.connection.port)
    }
  }

  net.wires = []
}
