import { type PortEntry } from "./Net.ts"

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
