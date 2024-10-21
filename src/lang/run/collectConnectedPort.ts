import { deleteNodeEntry } from "../net/deleteNodeEntry.js"
import { disconnectPort } from "../net/disconnectPort.js"
import { findPortEntry } from "../net/findPortEntry.js"
import { type Net } from "../net/index.js"
import { type Port } from "../port/index.js"
import { formatValue } from "../value/formatValue.js"

export function collectConnectedPort(component: Net, capPort: Port): Port {
  const capPortEntry = findPortEntry(component, capPort)
  if (capPortEntry?.connection === undefined) {
    throw new Error(
      [
        `[run] I expect the capPort to be connected.`,
        ``,
        `  capPort: ${formatValue(capPort)}`,
      ].join("\n"),
    )
  }

  const connectedPort = capPortEntry.connection.port

  disconnectPort(component, capPort)
  deleteNodeEntry(component, capPort.node)

  return connectedPort
}
