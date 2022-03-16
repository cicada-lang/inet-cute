import { match, matchList, matchSymbol } from "@cicada-lang/sexp/lib/match"
import { list, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Stmt } from "../stmt"
import * as Stmts from "../stmts"

export function matchStmt(sexp: Sexp): Stmt {
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
