import { Report, ReportEntry } from "./Report"

export function createReport(error: unknown, entry: ReportEntry): Report {
  if (error instanceof Report) {
    error.entries.push(entry)
    return error
  }

  const report = new Report()

  report.entries.push(createReportEntry(error))
  report.entries.push(entry)

  return report
}

function createReportEntry(error: unknown): ReportEntry {
  if (error instanceof Error) {
    return {
      message: error.message,
    }
  } else {
    return {
      message: String(error),
    }
  }
}
