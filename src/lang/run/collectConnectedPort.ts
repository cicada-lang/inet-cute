import { Net } from "../net"
import { deleteNodeEntry } from "../net/deleteNodeEntry"
import { disconnectPort } from "../net/disconnectPort"
import { findPortEntry } from "../net/findPortEntry"
import { Port } from "../port"
import { formatPort } from "../port/formatPort"

export function collectConnectedPort(component: Net, capPort: Port): Port {
  const capPortEntry = findPortEntry(component, capPort)
  if (capPortEntry?.connection === undefined) {
    throw new Error(
      [
        `[run] I expect the capPort to be connected.`,
        ``,
        `  capPort: ${formatPort(component, capPort)}`,
      ].join("\n"),
    )
  }

  const connectedPort = capPortEntry.connection.port

  disconnectPort(component, capPort)
  deleteNodeEntry(component, capPort.node)

  return connectedPort
}
