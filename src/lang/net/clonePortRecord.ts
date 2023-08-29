import { PortRecord } from "./Net"
import { clonePortEntry } from "./clonePortEntry"

export function clonePortRecord(record: PortRecord): PortRecord {
  return Object.fromEntries(
    Object.entries(record).map(([name, portEntry]) => [
      name,
      clonePortEntry(portEntry),
    ]),
  )
}
