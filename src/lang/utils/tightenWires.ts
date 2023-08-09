import { Env } from "../env"
import { connect } from "./connect"
import { disconnect } from "./disconnect"
import { removeNode } from "./removeNode"

export function tightenWires(env: Env): void {
  for (const wire of env.wires) {
    if (wire.first.connection && wire.second.connection) {
      removeNode(env, wire.first.node)
      removeNode(env, wire.second.node)

      const first = wire.first.connection.port
      const second = wire.second.connection.port

      disconnect(env, wire.first.connection.edge)
      disconnect(env, wire.second.connection.edge)

      connect(env, first, second)
    }
  }

  env.wires = []
}
