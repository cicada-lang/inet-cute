import { type PortEntry } from "./Net.js"

export function clonePortEntry(entry: PortEntry): PortEntry {
  return {
    ...entry,
    connection: entry.connection
      ? {
          ...entry.connection,
        }
      : undefined,
  }
}
