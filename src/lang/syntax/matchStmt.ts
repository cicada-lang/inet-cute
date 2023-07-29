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
import { Word } from "../word"
import * as Exps from "../words"

export function matchStmt(sexp: Sexp): Stmt {
  return match<Stmt>(sexp, [
    [
      ["defcons", v("name"), v("inputArity"), v("outputArity")],
      ({ name, inputArity, outputArity }) =>
        new Stmts.Defcons(
          matchSymbol(name),
          matchNumber(inputArity),
          matchNumber(outputArity),
          sexp.span,
        ),
    ],
    [
      ["defelim", v("name"), v("inputArity"), v("outputArity")],
      ({ name, inputArity, outputArity }) =>
        new Stmts.Defelim(
          matchSymbol(name),
          matchNumber(inputArity),
          matchNumber(outputArity),
          sexp.span,
        ),
    ],
    [
      list(["defnet", v("name")], v("words")),
      ({ name, input, output, words }) =>
        new Stmts.Defnet(matchSymbol(name), matchExps(words), sexp.span),
    ],
    [
      list(["defrule", [v("start"), v("end")]], v("words")),
      ({ start, end, words }) =>
        new Stmts.Defrule(
          matchSymbol(start),
          matchSymbol(end),
          matchExps(words),
          sexp.span,
        ),
    ],
  ])
}

function matchExps(sexp: Sexp): Array<Word> {
  return matchList(sexp, matchExp)
}

function matchExp(sexp: Sexp): Word {
  return match<Word>(sexp, [
    [
      list(["let"], v("names")),
      ({ names }) => new Exps.Let(matchList(names, matchSymbol), sexp.span),
    ],
    [v("name"), ({ name }) => new Exps.Call(matchSymbol(sexp), sexp.span)],
  ])
}
