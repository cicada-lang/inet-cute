import { PortExp } from "../graph/PortExp"
import { createPort } from "../graph/createPort"
import { Mod } from "../mod"
import { tickNodeCounter } from "../mod/tickNodeCounter"
import { Node } from "../node"

export function createNode(
  mod: Mod,
  name: string,
  input: Array<PortExp>,
  output: Array<PortExp>,
): Node {
  const node: Node = {
    id: tickNodeCounter(mod, name),
    mod,
    name,
    input: [],
    output: [],
  }

  node.input = input.map(({ name, isPrincipal }) =>
    createPort(
      node,
      name,
      { kind: "TypeTerm", name: "Trivial", args: [] },
      isPrincipal,
    ),
  )

  node.output = output.map(({ name, isPrincipal }) =>
    createPort(
      node,
      name,
      { kind: "TypeTerm", name: "Trivial", args: [] },
      isPrincipal,
    ),
  )

  return node
}
