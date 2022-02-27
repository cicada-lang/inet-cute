import pt from "@cicada-lang/partech"
import { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"

export function stmts_matcher(tree: pt.Tree): Array<Stmt> {
  return pt.matcher({
    "stmts:stmts": ({ stmts }) =>
      pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:define-node": ({ name, input, output }, { span }) =>
      new Stmts.DefineNodeStmt(
        pt.str(name),
        words_matcher(input),
        words_matcher(output),
        { span }
      ),
    "stmt:define-net": ({ name, words }, { span }) =>
      new Stmts.DefineNetStmt(pt.str(name), words_matcher(words), { span }),
    "stmt:define-rule": ({ start, end, words }, { span }) =>
      new Stmts.DefineRuleStmt(
        pt.str(start),
        pt.str(end),
        words_matcher(words),
        { span }
      ),
  })(tree)
}

export function words_matcher(tree: pt.Tree): Array<string> {
  return pt.matcher({
    "words:words": ({ words }, { span }) =>
      pt.matchers.zero_or_more_matcher(words).map(word_matcher),
  })(tree)
}

export function word_matcher(tree: pt.Tree): string {
  return pt.matcher({
    "word:identifier": ({ name }, { span }) => pt.str(name),
    "word:star": (_, { span }) => "*",
  })(tree)
}
