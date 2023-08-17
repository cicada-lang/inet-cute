import { Net } from "../net"
import { deleteNodeEntry } from "../net/deleteNodeEntry"
import { disconnectPort } from "../net/disconnectPort"
import { Port } from "../port"

export function releaseFreePorts(
  component: Net,
  placeholderPorts: Array<Port>,
): void {
  for (const placeholderPort of placeholderPorts) {
    disconnectPort(component, placeholderPort)
    deleteNodeEntry(component, placeholderPort.node)
  }
}
