import { Mod } from "../mod"
import { Net } from "../net"
import { createNode } from "../node/createNode"
import { Port } from "../port"
import { Value } from "../value"

export function createPlaceholderOutputPortFromType(
  net: Net,
  mod: Mod,
  t: Value,
): Port {
  const nodeName = `_placeholder_output_node_from_type`
  const portName = `_placeholder_output_port_from_type`
  const node = createNode(
    net,
    mod,
    nodeName,
    [],
    [
      {
        "@type": "PortExp",
        name: portName,
        t,
        isPrincipal: true,
      },
    ],
  )

  return node.output[0]
}
