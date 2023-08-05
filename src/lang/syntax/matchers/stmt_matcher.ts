import * as pt from "@cicada-lang/partech"
import type { Stmt } from "../../stmt"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:node": ({ name, input, output }, { span }) =>
      new Stmts.DefineNode(
        pt.str(name),
        matchers.ports_matcher(input),
        matchers.ports_matcher(output),
        span,
      ),
    "stmt:rule": ({ start, end, words }, { span }) =>
      new Stmts.DefineRule(
        pt.str(start),
        pt.str(end),
        matchers.words_matcher(words),
        span,
      ),
    "stmt:claim_with_output": ({ name, claimedOutputTypes }, { span }) =>
      new Stmts.Claim(
        pt.str(name),
        [],
        matchers.type_sequence_matcher(claimedOutputTypes),
        span,
      ),
    "stmt:claim_with_input_and_output": (
      { name, claimedInputTypes, claimedOutputTypes },
      { span },
    ) =>
      new Stmts.Claim(
        pt.str(name),
        matchers.type_sequence_matcher(claimedInputTypes),
        matchers.type_sequence_matcher(claimedOutputTypes),
        span,
      ),
    "stmt:define": ({ name, definedWords }, { span }) =>
      new Stmts.Define(
        pt.str(name),
        matchers.words_matcher(definedWords),
        span,
      ),
    "stmt:type": ({ name, arity }, { span }) =>
      new Stmts.DefineType(
        pt.str(name),
        Number.parseFloat(pt.str(arity)),
        span,
      ),
    "stmt:show": ({ words }, { span }) =>
      new Stmts.Show(matchers.words_matcher(words), span),
    "stmt:run": ({ words }, { span }) =>
      new Stmts.Run(matchers.words_matcher(words), span),
  })(tree)
}

export function stmts_matcher(tree: pt.Tree): Array<Stmt> {
  return pt.matcher({
    "stmts:stmts": ({ stmts }) =>
      pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}
