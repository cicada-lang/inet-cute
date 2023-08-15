import { Mod } from "../mod"
import { Net, PortEntries } from "../net"
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

  const ports: PortEntries = {}
  net.nodePorts.set(nodeKeyId(node), ports)

  node.input = input.map((portExp) => {
    const port = createInputPort(node, portExp)

    ports[port.name] = {
      name: port.name,
      sign: port.sign,
      t: port.t,
      isPrincipal: port.isPrincipal,
    }

    return port
  })

  node.output = output.map((portExp) => {
    const port = createOutputPort(node, portExp)

    ports[port.name] = {
      name: port.name,
      sign: port.sign,
      t: port.t,
      isPrincipal: port.isPrincipal,
    }

    return port
  })

  return node
}
