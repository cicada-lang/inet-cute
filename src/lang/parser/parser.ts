import { ParsingError } from "@cicada-lang/sexp/lib/errors"
import { Parser } from "@cicada-lang/sexp/lib/parser"
import { Stmt } from "../stmt"
import { matchStmt } from "./match"

const parser = Parser.create({
  quotes: [
    { mark: "'", symbol: "quote" },
    { mark: ",", symbol: "unquote" },
    { mark: "`", symbol: "quasiquote" },
  ],
  parentheses: [
    { start: "(", end: ")" },
    { start: "[", end: "]" },
  ],
  comments: [";"],
})

export function parseStmts(text: string): Array<Stmt> {
  try {
    return parser.parseMany(text).map(matchStmt)
  } catch (error) {
    if (error instanceof ParsingError) {
      const report = error.span.report(text)
      console.error(report)
    }

    throw error
  }
}
