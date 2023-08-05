import { Span } from "../span"

export type ReportEntry = {
  message: string
  context?: {
    span: Span
    text: string
  }
}

export class Report extends Error {
  entries: Array<ReportEntry> = []

  format(): string {
    return ""
  }

  get message(): string {
    return this.format()
  }
}
