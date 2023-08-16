import { NodeEntry } from "./Net"
import { clonePortRecord } from "./clonePortRecord"

export function cloneNodeEntry(entry: NodeEntry): NodeEntry {
  return { ...entry, ports: clonePortRecord(entry.ports) }
}
