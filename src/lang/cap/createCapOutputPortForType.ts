import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { findOutputPorts } from "../net/findOutputPorts"
import { Port } from "../port"
import { Value } from "../value"

export function createCapOutputPortForType(mod: Mod, net: Net, t: Value): Port {
  const nodeName = `_cap_output_node_from_type`
  const node = addNode(
    net,
    mod,
    nodeName,
    [],
    [
      {
        "@type": "PortExp",
        name: "covering",
        t,
        isPrincipal: true,
      },
    ],
  )

  return findOutputPorts(net, node)[0]
}
