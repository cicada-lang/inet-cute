import { disconnect } from "../connect/disconnect"
import { Env } from "../env"
import { findInputPorts } from "../net/findInputPorts"
import { findPortEntry } from "../net/findPortEntry"
import { Node } from "../node"

export function releaseFreePorts(env: Env, closer: Node | undefined): void {
  if (closer === undefined) {
    return
  }

  for (const port of findInputPorts(env.net, closer)) {
    if (port === undefined) {
      return
    }

    const portEntry = findPortEntry(env.net, port)
    if (portEntry?.connection === undefined) {
      throw new Error(`[releaseFreePorts] I expect port to have connection.`)
    }

    env.stack.push(portEntry.connection.port)

    disconnect(env.net, portEntry.connection.edge)
  }
}
