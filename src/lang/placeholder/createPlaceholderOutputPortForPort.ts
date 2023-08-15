import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { Port } from "../port"

export function createPlaceholderOutputPortForPort(
  net: Net,
  mod: Mod,
  port: Port,
): Port {
  const nodeName = `_placeholder_output_node_for_${port.name}_of_${port.node.name}`
  const portName = `_placeholder_output_port_for_${port.name}_of_${port.node.name}`
  const node = addNode(
    net,
    mod,
    nodeName,
    [],
    [
      {
        "@type": "PortExp",
        name: portName,
        t: port.t,
        isPrincipal: true,
      },
    ],
  )

  return node.output[0]
}
