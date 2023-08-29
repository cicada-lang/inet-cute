import { connectCapInputPort } from "../cap/connectCapInputPort"
import { connectCapOutputPort } from "../cap/connectCapOutputPort"
import { Mod } from "../mod"
import { Net } from "../net"
import { createNodeFromNodeEntry } from "../net/createNodeFromNodeEntry"
import { createPortFromPortEntry } from "../net/createPortFromPortEntry"
import { Port } from "../port"

/*

  For `PortReconnect` to work, the free ports on the stack
  need to be closed by a temporary root node.

*/

export function closeAllFreePorts(mod: Mod, net: Net): Array<Port> {
  const capPorts: Array<Port> = []
  for (const nodeEntry of net.nodeEntries.values()) {
    const node = createNodeFromNodeEntry(nodeEntry)

    for (const portEntry of Object.values(nodeEntry.ports)) {
      if (portEntry.connection === undefined) {
        const port = createPortFromPortEntry(node, portEntry)

        if (portEntry.sign === 1) {
          capPorts.push(connectCapInputPort(mod, net, port))
        } else {
          capPorts.push(connectCapOutputPort(mod, net, port))
        }
      }
    }
  }

  return capPorts
}
