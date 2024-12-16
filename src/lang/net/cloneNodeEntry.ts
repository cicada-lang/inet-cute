import { type NodeEntry } from "./Net.ts"
import { clonePortRecord } from "./clonePortRecord.ts"

export function cloneNodeEntry(entry: NodeEntry): NodeEntry {
  return { ...entry, ports: clonePortRecord(entry.ports) }
}
