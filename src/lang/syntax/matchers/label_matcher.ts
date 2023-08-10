import * as pt from "@cicada-lang/partech"

export function label_matcher(tree: pt.Tree): string {
  return pt.matcher({
    "label:label": ({ label }, { span }) => pt.str(label),
  })(tree)
}

export function labels_matcher(tree: pt.Tree): Array<string> {
  return pt.matcher({
    "labels:labels": ({ labels }) =>
      pt.matchers.zero_or_more_matcher(labels).map(label_matcher),
  })(tree)
}
