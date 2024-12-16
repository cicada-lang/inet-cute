import { type ReportEntry } from "./Report.ts"

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
