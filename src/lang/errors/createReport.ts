import { Report, ReportEntry } from "./Report"

export function createReport(error: unknown, entry: ReportEntry): Report {
  // NOTE We put the most recent report entry at the end,
  // because the end is closer to user's terminal output.

  if (error instanceof Report) {
    error.entries.push(entry)
    return error
  }

  return new Report([createReportEntry(error), entry])
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
