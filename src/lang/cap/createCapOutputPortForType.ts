import { Mod } from "../mod"
import { Net } from "../net"
import { addNode } from "../net/addNode"
import { findNodeEntryOrFail } from "../net/findNodeEntryOrFail"
import { findOutputPorts } from "../net/findOutputPorts"
import { Port } from "../port"
import { PortExp } from "../port/PortExp"
import { Value } from "../value"

export function createCapOutputPortForType(mod: Mod, net: Net, t: Value): Port {
  const portExp: PortExp = {
    "@type": "PortExp",
    name: "covering",
    t,
    isPrincipal: true,
  }

  const node = addNode(net, mod, "@type_cap", [], [portExp])
  const nodeEntry = findNodeEntryOrFail(net, node)
  nodeEntry.asTypeCap = {}

  return findOutputPorts(net, node)[0]
}
