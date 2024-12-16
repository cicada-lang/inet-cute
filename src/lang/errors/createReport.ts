import { Report, type ReportEntry } from "./Report.ts"

export function createReport(entry: ReportEntry): Report {
  return new Report([entry])
}
