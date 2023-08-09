import { Mod } from "../mod"
import { tickNodeCounter } from "../mod/tickNodeCounter"
import { Node } from "../node"
import { PortExp } from "../port/PortExp"
import { createInputPort } from "../port/createInputPort"
import { createOutputPort } from "../port/createOutputPort"

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

  node.input = input.map((port) => createInputPort(node, port))
  node.output = output.map((port) => createOutputPort(node, port))

  return node
}
