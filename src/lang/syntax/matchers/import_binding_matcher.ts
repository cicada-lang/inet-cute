import * as pt from "@cicada-lang/partech"
import * as Stmts from "../../stmts"
import * as matchers from "../matchers"

export function import_binding_matcher(tree: pt.Tree): Stmts.ImportBinding {
  return pt.matcher<Stmts.ImportBinding>({
    "import_binding:name": ({ name }) => ({
      name: pt.str(name),
    }),
    "import_binding:alias": ({ name, alias }) => ({
      name: pt.str(name),
      alias: pt.str(alias),
    }),
  })(tree)
}

export function import_binding_comma_matcher(
  tree: pt.Tree,
): Stmts.ImportBinding {
  return pt.matcher({
    "import_binding_comma:import_binding_comma": ({ binding }) =>
      import_binding_matcher(binding),
  })(tree)
}

export function import_bindings_matcher(
  tree: pt.Tree,
): Array<Stmts.ImportBinding> {
  return pt.matcher({
    "import_bindings:import_bindings": ({ bindings, last_binding }) => [
      ...pt.matchers
        .zero_or_more_matcher(bindings)
        .map(matchers.import_binding_comma_matcher),
      import_binding_matcher(last_binding),
    ],
  })(tree)
}