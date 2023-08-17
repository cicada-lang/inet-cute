import { Env } from "../env"
import { createNodeFromNodeEntry } from "../net/createNodeFromNodeEntry"
import { createPortFromPortEntry } from "../net/createPortFromPortEntry"
import { connectPlaceholderInputPort } from "../placeholder/connectPlaceholderInputPort"
import { connectPlaceholderOutputPort } from "../placeholder/connectPlaceholderOutputPort"
import { Port } from "../port"

/*

  For `PortReconnect` to work, the free ports on the stack
  need to be closed by a temporary root node.

*/

export function closeFreePorts(env: Env): Array<Port> {
  const placeholderPorts: Array<Port> = []
  for (const nodeEntry of env.net.nodeEntries.values()) {
    const node = createNodeFromNodeEntry(nodeEntry)

    for (const portEntry of Object.values(nodeEntry.ports)) {
      if (portEntry.connection === undefined) {
        const port = createPortFromPortEntry(node, portEntry)

        if (portEntry.sign === 1) {
          placeholderPorts.push(
            connectPlaceholderInputPort(env.mod, env.net, port),
          )
        } else {
          placeholderPorts.push(
            connectPlaceholderOutputPort(env.mod, env.net, port),
          )
        }
      }
    }
  }

  return placeholderPorts
}
