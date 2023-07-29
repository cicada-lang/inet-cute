import * as pt from "@cicada-lang/partech"

export function variable_names_matcher(tree: pt.Tree): Array<string> {
  return pt.matcher({
    "variable_names:variable_names": ({ variable_names, last_name }) => [
      ...pt.matchers.zero_or_more_matcher(variable_names).map(pt.str),
      pt.str(last_name),
    ],
  })(tree)
}
