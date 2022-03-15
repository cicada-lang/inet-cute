import {
  Lexer,
  list,
  match,
  matchList,
  matchSymbol,
  Parser,
  Sexp,
  v,
} from "@cicada-lang/sexp"
import { Stmt } from "../stmt"
import * as Stmts from "../stmts"

const lexer = new Lexer({
  quotes: [
    { mark: "'", symbol: "quote" },
    { mark: ",", symbol: "unquote" },
    { mark: "`", symbol: "quasiquote" },
  ],
  parentheses: [
    { start: "(", end: ")" },
    { start: "[", end: "]" },
    { start: "{", end: "}" },
  ],
  comments: [";", "//"],
  nulls: [],
})

const parser = new Parser({ lexer })

export function parseStmts(text: string): Array<Stmt> {
  const sexps = parser.parseMany(text)
  return sexps.map(matchStmt)
}

function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
    [
      ["define-node", v("name"), ["->", v("input"), v("output")]],
      ({ name, input, output }) =>
        new Stmts.DefineNodeStmt(
          matchSymbol(name),
          matchWords(input),
          matchWords(output),
          { span: sexp.span }
        ),
    ],
    [
      list(
        ["define-net", v("name"), ["->", v("input"), v("output")]],
        v("words")
      ),
      ({ name, input, output, words }) =>
        new Stmts.DefineNetStmt(matchSymbol(name), matchWords(words), {
          span: sexp.span,
        }),
    ],

    [
      ["define-rule", [v("start"), v("end")], v("words")],
      ({ start, end, words }) =>
        new Stmts.DefineRuleStmt(
          matchSymbol(start),
          matchSymbol(end),
          matchWords(words),
          { span: sexp.span }
        ),
    ],
  ])
}

function matchWords(sexp: Sexp): Array<string> {
  return matchList(sexp, matchSymbol)
}
