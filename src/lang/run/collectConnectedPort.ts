import { deleteNodeEntry } from "../net/deleteNodeEntry.ts"
import { disconnectPort } from "../net/disconnectPort.ts"
import { findPortEntry } from "../net/findPortEntry.ts"
import { type Net } from "../net/index.ts"
import { type Port } from "../port/index.ts"
import { formatValue } from "../value/formatValue.ts"

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
