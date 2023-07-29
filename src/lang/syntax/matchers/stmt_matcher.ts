import * as pt from "@cicada-lang/partech"
import type { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:defcons": ({ name, inputArity, outputArity }, { span }) =>
      new Stmts.Defcons(
        pt.str(name),
        Number(pt.str(inputArity)),
        Number(pt.str(outputArity)),
        span,
      ),
    "stmt:defelim": ({ name, inputArity, outputArity }, { span }) =>
      new Stmts.Defelim(
        pt.str(name),
        Number(pt.str(inputArity)),
        Number(pt.str(outputArity)),
        span,
      ),
    "stmt:defru": ({ start, end, words }, { span }) =>
      new Stmts.Defrule(
        pt.str(start),
        pt.str(end),
        matchers.words_matcher(words),
        span,
      ),
    "stmt:defnet": ({ name, words }, { span }) =>
      new Stmts.Defnet(pt.str(name), matchers.words_matcher(words), span),
  })(tree)
}

export function stmts_matcher(tree: pt.Tree): Array<Stmt> {
  return pt.matcher({
    "stmts:stmts": ({ stmts }) =>
      pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}
