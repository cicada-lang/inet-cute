import { PortEntry } from "./Net"

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
