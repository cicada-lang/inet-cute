import { disconnect } from "../connect/disconnect"
import { Env } from "../env"
import { findConnection } from "../net/findConnection"
import { Node } from "../node"

export function releaseFreePorts(env: Env, closer: Node | undefined): void {
  if (closer === undefined) {
    return
  }

  for (const port of closer.input) {
    if (port === undefined) {
      return
    }

    const connection = findConnection(env.net, port)
    if (connection === undefined) {
      throw new Error(`[releaseFreePorts] I expect port to have connection.`)
    }

    env.stack.push(connection.port)

    disconnect(env.net, connection.edge)
  }
}
