import { Env } from "../env"
import { disconnectPort } from "../net/disconnectPort"
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

    disconnectPort(env.net, portEntry.connection.port)
  }
}
