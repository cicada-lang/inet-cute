import * as Defs from "../defs"
import { Node } from "../node"
import { createPort } from "../port"
import { Type } from "../type"

let counter = 0

export function createNode(
  def: Defs.NodeDef,
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

  return node
}
