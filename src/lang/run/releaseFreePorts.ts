import { Env } from "../env"
import { disconnect } from "../env/disconnect"
import { removeNode } from "../env/removeNode"
import { Node } from "../graph/Node"

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

    env.ports.push(port.connection.port)

    disconnect(env, port.connection.edge)
  }

  removeNode(env, closer)
}
