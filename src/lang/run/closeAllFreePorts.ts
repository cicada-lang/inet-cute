import { capInputPort } from "../cap/capInputPort.js"
import { capOutputPort } from "../cap/capOutputPort.js"
import { type Mod } from "../mod/index.js"
import { createNodeFromNodeEntry } from "../net/createNodeFromNodeEntry.js"
import { createPortFromPortEntry } from "../net/createPortFromPortEntry.js"
import { type Net } from "../net/index.js"
import { type Port } from "../port/index.js"

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
          capPorts.push(capOutputPort(mod, net, port))
        } else {
          capPorts.push(capInputPort(mod, net, port))
        }
      }
    }
  }

  return capPorts
}
