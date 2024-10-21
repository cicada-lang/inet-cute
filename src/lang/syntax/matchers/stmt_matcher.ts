import * as pt from "@cicada-lang/partech"
import type { Stmt } from "../../stmt/index.js"
import * as Stmts from "../../stmts/index.js"
import * as matchers from "../matchers/index.js"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:node": ({ name, input, output }, { span }) =>
      new Stmts.DefineNode(
        pt.str(name),
        matchers.words_matcher(input),
        matchers.words_matcher(output),
        span,
      ),
    "stmt:rule": ({ first, second, words }, { span }) =>
      new Stmts.DefineRule(
        pt.str(first),
        pt.str(second),
        matchers.words_matcher(words),
        span,
      ),
    "stmt:claim": ({ name, input, output }, { span }) =>
      new Stmts.Claim(
        pt.str(name),
        matchers.words_matcher(input),
        matchers.words_matcher(output),
        span,
      ),
    "stmt:define": ({ name, words }, { span }) =>
      new Stmts.Define(pt.str(name), matchers.words_matcher(words), span),
    "stmt:type": ({ name, input, output }, { span }) =>
      new Stmts.DefineType(
        pt.str(name),
        matchers.words_matcher(input),
        matchers.words_matcher(output),
        span,
      ),
    "stmt:check": ({ input, output, words }, { span }) =>
      new Stmts.Check(
        matchers.words_matcher(input),
        matchers.words_matcher(output),
        matchers.words_matcher(words),
        span,
      ),
    "stmt:import": ({ bindings, path }, { span }) =>
      new Stmts.Import(
        matchers.import_bindings_matcher(bindings),
        pt.trim_boundary(pt.str(path), 1),
        span,
      ),
    "stmt:require": ({ path }, { span }) =>
      new Stmts.Require(pt.trim_boundary(pt.str(path), 1), span),
    "stmt:compose": ({ word }, { span }) =>
      new Stmts.Compose(matchers.word_matcher(word), span),
  })(tree)
}

export function stmts_matcher(tree: pt.Tree): Array<Stmt> {
  return pt.matcher({
    "stmts:stmts": ({ stmts }) =>
      pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}
