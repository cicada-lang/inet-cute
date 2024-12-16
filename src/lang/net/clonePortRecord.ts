import { type PortRecord } from "./Net.ts"
import { clonePortEntry } from "./clonePortEntry.ts"

export function clonePortRecord(record: PortRecord): PortRecord {
  return Object.fromEntries(
    Object.entries(record).map(([name, portEntry]) => [
      name,
      clonePortEntry(portEntry),
    ]),
  )
}
