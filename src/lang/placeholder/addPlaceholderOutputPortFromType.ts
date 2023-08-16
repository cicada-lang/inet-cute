import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { findOutputPorts } from "../net/findOutputPorts"
import { Port } from "../port"
import { Value } from "../value"

export function addPlaceholderOutputPortFromType(
  net: Net,
  mod: Mod,
  t: Value,
): Port {
  const nodeName = `_placeholder_output_node_from_type`
  const portName = `_placeholder_output_port_from_type`
  const node = addNode(
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

  return findOutputPorts(net, node)[0]
}
