import * as pt from "@cicada-lang/partech"
import { Sign, SignedType, Value } from "../../value"

export function type_matcher(tree: pt.Tree): Value {
  return pt.matcher<Value>({
    "type:type_var": ({ name }, { span }) => ({
      "@type": "Value",
      "@kind": "TypeVar",
      name: pt.str(name),
    }),
    "type:type_term_zero_arity": ({ name }, { span }) => ({
      "@type": "Value",
      "@kind": "TypeTerm",
      name: pt.str(name),
      args: [],
    }),
    "type:type_term": ({ name, type_args }, { span }) => ({
      "@type": "Value",
      "@kind": "TypeTerm",
      name: pt.str(name),
      args: type_args_matcher(type_args),
    }),
  })(tree)
}

export function type_args_matcher(tree: pt.Tree): Array<Value> {
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
  return pt.matcher<SignedType>({
    "signed_type_with_optional_semicolon:positive": ({ type }) => ({
      "@type": "Value",
      "@kind": "SignedType",
      t: type_matcher(type),
      sign: 1 as Sign,
    }),
    "signed_type_with_optional_semicolon:negative": ({ type }) => ({
      "@type": "Value",
      "@kind": "SignedType",
      t: type_matcher(type),
      sign: -1 as Sign,
    }),
    "signed_type_with_optional_semicolon:neutral": ({ type }) => ({
      "@type": "Value",
      "@kind": "SignedType",
      t: type_matcher(type),
      sign: 0 as Sign,
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
