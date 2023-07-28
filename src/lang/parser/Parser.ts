import { Parser as SexpParser } from "@cicada-lang/sexp/lib/parser"
import { Stmt } from "../stmt"
import { matchStmt } from "./match"

export class Parser extends SexpParser {
  constructor() {
    super({
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
  }

  parseStmts(text: string): Array<Stmt> {
    return this.parseSexps(text).map(matchStmt)
  }
}
