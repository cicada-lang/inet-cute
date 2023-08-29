import { connect } from "../connect/connect"
import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { findOutputPorts } from "../net/findOutputPorts"
import { Port } from "../port"

export function connectCapOutputPort(mod: Mod, net: Net, port: Port): Port {
  const nodeName = `_cap_output_node_for_${port.name}_of_${port.node.name}`
  const portName = `_cap_output_port_for_${port.name}_of_${port.node.name}`
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

  const capPort = findOutputPorts(net, node)[0]

  connect(net, port, capPort)

  return capPort
}
