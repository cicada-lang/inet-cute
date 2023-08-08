import * as pt from "@cicada-lang/partech"
import * as Types from "../../type"
import { SignedType, Type } from "../../type"

export function type_matcher(tree: pt.Tree): Type {
  return pt.matcher<Type>({
    "type:type_var": ({ name }, { span }) => ({
      ["@kind"]: "TypeVar",
      name: pt.str(name),
    }),
    "type:type_term_zero_arity": ({ name }, { span }) => ({
      ["@kind"]: "TypeTerm",
      name: pt.str(name),
      args: [],
    }),
    "type:type_term": ({ name, type_args }, { span }) => ({
      ["@kind"]: "TypeTerm",
      name: pt.str(name),
      args: type_args_matcher(type_args),
    }),
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

export function signed_type_with_optional_semicolon_matcher(
  tree: pt.Tree,
): SignedType {
  return pt.matcher({
    "signed_type_with_optional_semicolon:positive": ({ type }) => ({
      t: type_matcher(type),
      sign: 1 as Types.Sign,
    }),
    "signed_type_with_optional_semicolon:negative": ({ type }) => ({
      t: type_matcher(type),
      sign: -1 as Types.Sign,
    }),
    "signed_type_with_optional_semicolon:neutral": ({ type }) => ({
      t: type_matcher(type),
      sign: 0 as Types.Sign,
    }),
  })(tree)
}

export function signed_type_sequence_matcher(tree: pt.Tree): Array<SignedType> {
  return pt.matcher({
    "signed_type_sequence:signed_type_sequence": ({ types }) =>
      pt.matchers
        .zero_or_more_matcher(types)
        .map(signed_type_with_optional_semicolon_matcher),
  })(tree)
}
