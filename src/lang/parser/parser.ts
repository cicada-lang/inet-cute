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
  return parser.parseMany(text).map(matchStmt)
}
