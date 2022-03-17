import {
  match,
  matchList,
  matchNumber,
  matchSymbol,
} from "@cicada-lang/sexp/lib/match"
import { list, v } from "@cicada-lang/sexp/lib/pattern-exp"
import { Sexp } from "@cicada-lang/sexp/lib/sexp"
import { Exp } from "../exp"
import * as Exps from "../exps"
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
      list(["define-net", v("name")], v("exps")),
      ({ name, input, output, exps }) =>
        new Stmts.DefineNetStmt(matchSymbol(name), matchExps(exps), {
          span: sexp.span,
        }),
    ],
    [
      ["define-rule", [v("start"), v("end")], v("exps")],
      ({ start, end, exps }) =>
        new Stmts.DefineRuleStmt(
          matchSymbol(start),
          matchSymbol(end),
          matchExps(exps),
          { span: sexp.span }
        ),
    ],
  ])
}

function matchExps(sexp: Sexp): Array<Exp> {
  return matchList(sexp, (sexp) => {
    return new Exps.Call(matchSymbol(sexp), sexp.span)
  })
}
