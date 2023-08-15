import { Mod } from "../mod"
import { Net } from "../net"
import { Node } from "../node"
import { createNodeId } from "../node/createNodeId"
import { nodeKeyId } from "../node/nodeKeyId"
import { PortExp } from "../port/PortExp"
import { createInputPort } from "../port/createInputPort"
import { createOutputPort } from "../port/createOutputPort"

export function addNode(
  net: Net,
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

  net.nodePorts.set(nodeKeyId(node), {})

  node.input = input.map((port) => createInputPort(node, port))
  node.output = output.map((port) => createOutputPort(node, port))

  return node
}
