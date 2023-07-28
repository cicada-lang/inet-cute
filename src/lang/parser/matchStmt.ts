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
      ["defcons", v("name"), v("inputArity"), v("outputArity")],
      ({ name, inputArity, outputArity }) =>
        new Stmts.DefconsStmt(
          matchSymbol(name),
          matchNumber(inputArity),
          matchNumber(outputArity),
          sexp.span,
        ),
    ],
    [
      ["defcons", v("name"), v("inputArity")],
      ({ name, inputArity }) =>
        new Stmts.DefconsStmt(
          matchSymbol(name),
          matchNumber(inputArity),
          1,
          sexp.span,
        ),
    ],
    [
      ["defelim", v("name"), v("inputArity"), v("outputArity")],
      ({ name, inputArity, outputArity }) =>
        new Stmts.DefelimStmt(
          matchSymbol(name),
          matchNumber(inputArity),
          matchNumber(outputArity),
          sexp.span,
        ),
    ],
    [
      ["defelim", v("name"), v("inputArity")],
      ({ name, inputArity }) =>
        new Stmts.DefelimStmt(
          matchSymbol(name),
          matchNumber(inputArity),
          1,
          sexp.span,
        ),
    ],
    [
      list(["defnet", v("name")], v("exps")),
      ({ name, input, output, exps }) =>
        new Stmts.DefnetStmt(matchSymbol(name), matchExps(exps), sexp.span),
    ],
    [
      list(["defrule", [v("start"), v("end")]], v("exps")),
      ({ start, end, exps }) =>
        new Stmts.DefruleStmt(
          matchSymbol(start),
          matchSymbol(end),
          matchExps(exps),
          sexp.span,
        ),
    ],
  ])
}

function matchExps(sexp: Sexp): Array<Exp> {
  return matchList(sexp, matchExp)
}

function matchExp(sexp: Sexp): Exp {
  return match<Exp>(sexp, [
    [
      list(["let"], v("names")),
      ({ names }) => new Exps.Let(matchList(names, matchSymbol), sexp.span),
    ],
    [v("name"), ({ name }) => new Exps.Call(matchSymbol(sexp), sexp.span)],
  ])
}
