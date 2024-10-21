import { connect } from "../connect/connect.js"
import { type Mod } from "../mod/index.js"
import { addNode } from "../net/addNode.js"
import { findInputPorts } from "../net/findInputPorts.js"
import { findNodeEntryOrFail } from "../net/findNodeEntryOrFail.js"
import { type Net } from "../net/index.js"
import { type PortExp } from "../port/PortExp.js"
import { type Port } from "../port/index.js"

export function capOutputPort(mod: Mod, net: Net, port: Port): Port {
  const portExp: PortExp = {
    "@type": "PortExp",
    name: "covering",
    t: port.t,
    isPrincipal: false,
  }

  const node = addNode(net, mod, "@ouputPortCap", [portExp], [])
  const nodeEntry = findNodeEntryOrFail(net, node)
  nodeEntry.asPortCap = {
    nodeName: port.node.name,
    portName: port.name,
  }

  const capPort = findInputPorts(net, node)[0]
  connect(net, port, capPort)
  return capPort
}
