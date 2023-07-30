import * as pt from "@cicada-lang/partech"
import type { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:defnode": ({ name, input, output }, { span }) =>
      new Stmts.Defnode(
        pt.str(name),
        matchers.ports_matcher(input),
        matchers.ports_matcher(output),
        span,
      ),
    "stmt:defrule": ({ start, end, words }, { span }) =>
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
