import { Mod } from "../mod"
import { Net } from "../net"
import { createNode } from "../node/createNode"
import { Port } from "../port"

export function createPlaceholderInputPortForPort(
  net: Net,
  mod: Mod,
  port: Port,
): Port {
  const nodeName = `_placeholder_input_node_for_${port.name}_of_${port.node.name}`
  const portName = `_placeholder_input_port_for_${port.name}_of_${port.node.name}`
  const node = createNode(
    net,
    mod,
    nodeName,
    [
      {
        "@type": "PortExp",
        name: portName,
        t: port.t,
        isPrincipal: true,
      },
    ],
    [],
  )

  return node.input[0]
}
