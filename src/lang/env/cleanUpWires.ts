import { Env } from "./Env"
import { connect } from "./connect"
import { disconnect } from "./disconnect"
import { removeNode } from "./removeNode"

export function cleanUpWires(env: Env): void {
  for (const wire of env.wires) {
    if (wire.start.connection && wire.end.connection) {
      removeNode(env, wire.start.node)
      removeNode(env, wire.end.node)

      const start = wire.start.connection.port
      const end = wire.end.connection.port

      disconnect(env, wire.start.connection.edge)
      disconnect(env, wire.end.connection.edge)

      connect(env, start, end)
    }
  }

  env.wires = []
}
