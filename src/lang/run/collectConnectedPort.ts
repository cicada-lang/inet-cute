import { Net } from "../net"
import { deleteNodeEntry } from "../net/deleteNodeEntry"
import { disconnectPort } from "../net/disconnectPort"
import { findHalfEdgeEntryOrFail } from "../net/findHalfEdgeEntryOrFail"
import { findPortEntry } from "../net/findPortEntry"
import { Port } from "../port"
import { formatPort } from "../port/formatPort"

export function collectConnectedPort(component: Net, capPort: Port): Port {
  const capPortEntry = findPortEntry(component, capPort)
  if (capPortEntry?.connection === undefined) {
    throw new Error(
      [
        `[collectConnectedPort] I expect the capPort to be connected.`,
        ``,
        `  capPort: ${formatPort(component, capPort)}`,
      ].join("\n"),
    )
  }

  const halfEdgeEntry = findHalfEdgeEntryOrFail(
    component,
    capPortEntry.connection.halfEdge,
  )

  const ohterHalfEdgeEntry = findHalfEdgeEntryOrFail(
    component,
    halfEdgeEntry.otherHalfEdge,
  )

  const connectedPort = ohterHalfEdgeEntry.port

  if (connectedPort === undefined) {
    throw new Error(
      `[collectConnectedPort] I expect halfEdgeEntry to have port.`,
    )
  }

  disconnectPort(component, capPort)
  deleteNodeEntry(component, capPort.node)

  return connectedPort
}
