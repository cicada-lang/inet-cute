import { Report, type ReportEntry } from "./Report.js"

export function createReport(entry: ReportEntry): Report {
  return new Report([entry])
}
