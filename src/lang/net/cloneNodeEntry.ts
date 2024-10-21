import { type NodeEntry } from "./Net.js"
import { clonePortRecord } from "./clonePortRecord.js"

export function cloneNodeEntry(entry: NodeEntry): NodeEntry {
  return { ...entry, ports: clonePortRecord(entry.ports) }
}
