import { Mod } from "../mod"
import { Node } from "../node"
import { PortExp } from "../port/PortExp"
import { createInputPort } from "../port/createInputPort"
import { createOutputPort } from "../port/createOutputPort"
import { createNodeId } from "./createNodeId"

export function createNode(
  mod: Mod,
  name: string,
  input: Array<PortExp>,
  output: Array<PortExp>,
): Node {
  const node: Node = {
    id: createNodeId(mod, name),
    mod,
    name,
    input: [],
    output: [],
  }

  node.input = input.map((port) => createInputPort(node, port))
  node.output = output.map((port) => createOutputPort(node, port))

  return node
}
