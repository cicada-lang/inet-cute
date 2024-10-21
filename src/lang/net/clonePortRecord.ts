import { type PortRecord } from "./Net.js"
import { clonePortEntry } from "./clonePortEntry.js"

export function clonePortRecord(record: PortRecord): PortRecord {
  return Object.fromEntries(
    Object.entries(record).map(([name, portEntry]) => [
      name,
      clonePortEntry(portEntry),
    ]),
  )
}
