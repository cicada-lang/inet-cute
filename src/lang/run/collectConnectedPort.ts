import { Net } from "../net"
import { deleteNodeEntry } from "../net/deleteNodeEntry"
import { disconnectPort } from "../net/disconnectPort"
import { findPortEntry } from "../net/findPortEntry"
import { Port } from "../port"
import { formatValue } from "../value/formatValue"

export function collectResultPort(component: Net, placeholderPort: Port): Port {
  const placeholderPortEntry = findPortEntry(component, placeholderPort)
  if (placeholderPortEntry?.connection === undefined) {
    throw new Error(
      [
        `[run] I expect the placeholderPort to be connected.`,
        ``,
        `  placeholderPort: ${formatValue(placeholderPort)}`,
      ].join("\n"),
    )
  }

  const connectedPort = placeholderPortEntry.connection.port

  disconnectPort(component, placeholderPort)
  deleteNodeEntry(component, placeholderPort.node)

  return connectedPort
}
