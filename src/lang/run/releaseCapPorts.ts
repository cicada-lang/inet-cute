import { Net } from "../net"
import { deleteNodeEntry } from "../net/deleteNodeEntry"
import { disconnectPort } from "../net/disconnectPort"
import { Port } from "../port"

export function releaseCapPorts(component: Net, capPorts: Array<Port>): void {
  for (const capPort of capPorts) {
    disconnectPort(component, capPort)
    deleteNodeEntry(component, capPort.node)
  }
}
