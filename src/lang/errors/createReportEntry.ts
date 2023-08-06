import { ReportEntry } from "./Report"

export function createReportEntry(error: unknown): ReportEntry {
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
