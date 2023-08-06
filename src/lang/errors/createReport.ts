import { Report, ReportEntry } from "./Report"

export function createReport(entry: ReportEntry): Report {
  return new Report([entry])
}
