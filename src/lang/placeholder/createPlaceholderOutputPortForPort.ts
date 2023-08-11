import { Mod } from "../mod"
import { createNode } from "../node/createNode"
import { Port } from "../port"

export function createPlaceholderOutputPortForPort(mod: Mod, port: Port): Port {
  const nodeName = `_placeholder_output_node_for_${port.name}_of_${port.node.name}`
  const portName = `_placeholder_output_port_for_${port.name}_of_${port.node.name}`
  const node = createNode(
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
