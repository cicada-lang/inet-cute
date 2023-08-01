import { Net } from "../net"
import { connect } from "../net/connect"
import { disconnect } from "../net/disconnect"
import { removeNode } from "../net/removeNode"

export function cleanUpWires(net: Net): void {
  for (const wire of net.wires) {
    if (wire.start.connection && wire.end.connection) {
      removeNode(net, wire.start.node)
      removeNode(net, wire.end.node)

      const start = wire.start.connection.port
      const end = wire.end.connection.port

      disconnect(net, wire.start.connection.edge)
      disconnect(net, wire.end.connection.edge)

      connect(net, start, end)
    }
  }

  net.wires = []
}
