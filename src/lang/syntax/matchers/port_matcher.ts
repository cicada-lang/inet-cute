import * as pt from "@cicada-lang/partech"
import { PortExp } from "../../stmts"

export function port_matcher(tree: pt.Tree): PortExp {
  return pt.matcher<PortExp>({
    "port:normal": ({ name, type }, { span }) => ({
      name: pt.str(name),
      isPrincipal: false,
    }),
    "port:principal": ({ name, type }, { span }) => ({
      name: pt.str(name),
      isPrincipal: true,
    }),
  })(tree)
}

export function ports_matcher(tree: pt.Tree): Array<PortExp> {
  return pt.matcher({
    "ports:ports": ({ ports }) =>
      pt.matchers.zero_or_more_matcher(ports).map(port_matcher),
  })(tree)
}
