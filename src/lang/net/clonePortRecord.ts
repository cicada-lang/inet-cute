import { PortRecord } from "./Net"

export function clonePortRecord(record: PortRecord): PortRecord {
  return { ...record }
}
