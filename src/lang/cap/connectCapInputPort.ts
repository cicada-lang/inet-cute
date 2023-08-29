import { connect } from "../connect/connect"
import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { findInputPorts } from "../net/findInputPorts"
import { Port } from "../port"

export function connectCapInputPort(mod: Mod, net: Net, port: Port): Port {
  const nodeName = `_cap_input_node_for_${port.name}_of_${port.node.name}`
  const node = addNode(
    net,
    mod,
    nodeName,
    [
      {
        "@type": "PortExp",
        name: "covering",
        t: port.t,
        isPrincipal: true,
      },
    ],
    [],
  )

  const capPort = findInputPorts(net, node)[0]
  connect(net, port, capPort)
  return capPort
}
