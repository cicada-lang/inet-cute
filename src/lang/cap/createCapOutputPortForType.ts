import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { findOutputPorts } from "../net/findOutputPorts"
import { Port } from "../port"
import { Value } from "../value"

export function createCapOutputPortForType(mod: Mod, net: Net, t: Value): Port {
  const nodeName = `_cap_output_node_from_type`
  const portName = `_cap_output_port_from_type`
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
