import * as pt from "@cicada-lang/partech"
import * as Types from "../../type"
import { Type } from "../../type"

export function type_matcher(tree: pt.Tree): Type {
  return pt.matcher<Type>({
    "type:var": ({ name }, { span }) => Types.TypeVar(pt.str(name)),
    "type:term_zero_arity": ({ name }, { span }) =>
      Types.TypeTerm(pt.str(name), []),
    "type:term": ({ name, type_args }, { span }) =>
      Types.TypeTerm(pt.str(name), type_args_matcher(type_args)),
  })(tree)
}

export function type_args_matcher(tree: pt.Tree): Array<Type> {
  return pt.matcher({
    "type_args:type_args": ({ types, last_type }) => [
      ...pt.matchers.zero_or_more_matcher(types).map(type_matcher),
      type_matcher(last_type),
    ],
  })(tree)
}

export function type_with_optional_semicolon_matcher(tree: pt.Tree): Type {
  return pt.matcher({
    "type_with_optional_semicolon:type_with_optional_semicolon": ({ type }) =>
      type_matcher(type),
  })(tree)
}

export function type_sequence_matcher(tree: pt.Tree): Array<Type> {
  return pt.matcher({
    "type_sequence:type_sequence": ({ types }) =>
      pt.matchers
        .zero_or_more_matcher(types)
        .map(type_with_optional_semicolon_matcher),
  })(tree)
}
