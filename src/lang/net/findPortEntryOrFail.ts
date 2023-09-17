import { Port } from "../port"
import { Net, PortEntry } from "./Net"
import { findPortEntry } from "./findPortEntry"

export function findPortEntryOrFail(net: Net, port: Port): PortEntry {
  const portEntry = findPortEntry(net, port)
  if (portEntry === undefined) {
    throw new Error(`[findPortEntryOrFail] Undefined port`)
  }

  return portEntry
}
