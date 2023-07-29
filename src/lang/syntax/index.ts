import { Stmt } from "../stmt"
import { Parser } from "./Parser"
import { matchStmt } from "./matchStmt"

export function parseStmts(text: string): Array<Stmt> {
  const parser = new Parser()
  return parser.parseSexps(text).map(matchStmt)
}
