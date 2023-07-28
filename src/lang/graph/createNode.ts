import * as Definitions from "../definitions"
import { Node, createPort } from "../graph"
import { Type } from "../type"

let counter = 0

export function createNode(
  kind: Definitions.NodeKind,
  def: Definitions.NodeDefinition,
  inputTypes: Array<Type>,
  outputTypes: Array<Type>,
): Node {
  const node: Node = {
    id: counter++,
    def: def,
    mod: def.mod,
    name: def.name,
    types: [...inputTypes, ...outputTypes],
    input: [],
    output: [],
  }

  let portCount = 0

  node.input = inputTypes.map((t) => createPort(node, portCount++))
  node.output = outputTypes.map((t) => createPort(node, portCount++))

  if (kind === "Cons") {
    const lastPort = node.output[node.output.length - 1]
    if (lastPort) {
      lastPort.isPrincipal = true
    }
  }

  if (kind === "Elim") {
    const lastPort = node.input[node.input.length - 1]
    if (lastPort) {
      lastPort.isPrincipal = true
    }
  }

  return node
}
