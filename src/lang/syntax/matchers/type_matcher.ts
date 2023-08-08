import * as pt from "@cicada-lang/partech"
import { Value } from "../../value"

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
