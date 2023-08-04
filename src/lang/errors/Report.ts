import { Span } from "../span"

export type ReportEntry = {
  message: string
  span: Span
  text: string
}

export class Report extends Error {
  entries: Array<ReportEntry> = []

  constructor(message: string) {
    super(message)
  }
}
