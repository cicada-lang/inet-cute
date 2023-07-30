import { Node, createPort } from "../graph"
import { Mod } from "../mod"
import { PortExp } from "../stmts"

export function createNode(
  mod: Mod,
  name: string,
  input: Array<PortExp>,
  output: Array<PortExp>,
): Node {
  const node: Node = {
    id: mod.nodeCounter++,
    mod,
    name,
    input: [],
    output: [],
  }

  node.input = input.map(({ name, isPrincipal }) =>
    createPort(node, name, {}, isPrincipal),
  )

  node.output = output.map(({ name, isPrincipal }) =>
    createPort(node, name, {}, isPrincipal),
  )

  return node
}
