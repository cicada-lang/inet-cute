import { Env } from "../env"
import { Node } from "../node"
import { disconnect } from "../utils/disconnect"

export function releaseFreePorts(env: Env, closer: Node | undefined): void {
  if (closer === undefined) {
    return
  }

  for (const port of closer.input) {
    if (port === undefined) {
      return
    }

    if (port.connection === undefined) {
      throw new Error(`[releaseFreePorts] I expect port to have connection.`)
    }

    env.stack.push(port.connection.port)

    disconnect(env, port.connection.edge)
  }
}
