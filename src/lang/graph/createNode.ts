import { Node } from "../graph"
import { Mod } from "../mod"
import { PortExp } from "../stmts"
import * as Types from "../type"
import { createPort } from "./createPort"

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
    createPort(node, name, Types.TypeTerm("Trivial", []), isPrincipal),
  )

  node.output = output.map(({ name, isPrincipal }) =>
    createPort(node, name, Types.TypeTerm("Trivial", []), isPrincipal),
  )

  return node
}
