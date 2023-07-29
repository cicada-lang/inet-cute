import { NodeKind } from "../definitions"
import { Node, createPort } from "../graph"
import { Mod } from "../mod"
import { PortExp } from "../stmts"

let counter = 0

export function createNode(
  kind: NodeKind,
  mod: Mod,
  name: string,
  input: Array<PortExp>,
  output: Array<PortExp>,
): Node {
  const node: Node = {
    id: counter++,
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

  if (kind === "Cons") {
    const lastPort = node.output[node.output.length - 1]
    if (lastPort) {
      lastPort.isPrincipal = true
    }
  }

  if (kind === "Elim") {
    const firstPort = node.input[0]
    if (firstPort) {
      firstPort.isPrincipal = true
    }
  }

  return node
}
