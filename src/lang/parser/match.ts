import {
  match,
  matchList,
  matchNumber,
  matchSymbol,
} from "@cicada-lang/sexp/lib/match"
import { list, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Stmt } from "../stmt"
import * as Stmts from "../stmts"

export function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
    [
      ["define-cons", v("name"), v("inputArity"), v("outputArity")],
      ({ name, inputArity, outputArity }) =>
        new Stmts.DefineConsStmt(
          matchSymbol(name),
          matchNumber(inputArity),
          matchNumber(outputArity),
          { span: sexp.span }
        ),
    ],
    [
      ["define-cons", v("name"), v("inputArity")],
      ({ name, inputArity }) =>
        new Stmts.DefineConsStmt(
          matchSymbol(name),
          matchNumber(inputArity),
          1,
          { span: sexp.span }
        ),
    ],
    [
      ["define-elim", v("name"), v("inputArity"), v("outputArity")],
      ({ name, inputArity, outputArity }) =>
        new Stmts.DefineElimStmt(
          matchSymbol(name),
          matchNumber(inputArity),
          matchNumber(outputArity),
          { span: sexp.span }
        ),
    ],
    [
      ["define-elim", v("name"), v("inputArity")],
      ({ name, inputArity }) =>
        new Stmts.DefineElimStmt(
          matchSymbol(name),
          matchNumber(inputArity),
          1,
          { span: sexp.span }
        ),
    ],
    [
      list(["define-net", v("name")], v("words")),
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
