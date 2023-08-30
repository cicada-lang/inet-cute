import { connect } from "../connect/connect"
import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { findInputPorts } from "../net/findInputPorts"
import { findNodeEntryOrFail } from "../net/findNodeEntryOrFail"
import { Port } from "../port"
import { PortExp } from "../port/PortExp"

export function capOutputPort(mod: Mod, net: Net, port: Port): Port {
  const portExp: PortExp = {
    "@type": "PortExp",
    name: "covering",
    t: port.t,
    isPrincipal: false,
  }

  const node = addNode(net, mod, "@ouput_port_cap", [portExp], [])
  const nodeEntry = findNodeEntryOrFail(net, node)
  nodeEntry.asPortCap = {
    nodeName: port.node.name,
    portName: port.name,
  }

  const capPort = findInputPorts(net, node)[0]
  connect(net, port, capPort)
  return capPort
}
