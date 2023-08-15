import { disconnect } from "../connect/disconnect"
import { Env } from "../env"
import { findPortConnection } from "../net/findPortConnection"
import { Node } from "../node"

export function releaseFreePorts(env: Env, closer: Node | undefined): void {
  if (closer === undefined) {
    return
  }

  for (const port of closer.input) {
    if (port === undefined) {
      return
    }

    const connection = findPortConnection(env.net, port)
    if (connection === undefined) {
      throw new Error(`[releaseFreePorts] I expect port to have connection.`)
    }

    env.stack.push(connection.port)

    disconnect(env.net, connection.edge)
  }
}
