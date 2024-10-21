import { type Mod } from "../mod/index.js"
import { addNode } from "../net/addNode.js"
import { findNodeEntryOrFail } from "../net/findNodeEntryOrFail.js"
import { findOutputPorts } from "../net/findOutputPorts.js"
import { type Net } from "../net/index.js"
import { type PortExp } from "../port/PortExp.js"
import { type Port } from "../port/index.js"
import { type Value } from "../value/index.js"

export function capType(mod: Mod, net: Net, t: Value): Port {
  const portExp: PortExp = {
    "@type": "PortExp",
    name: "covering",
    t,
    isPrincipal: false,
  }

  const node = addNode(net, mod, "@typeCap", [], [portExp])
  const nodeEntry = findNodeEntryOrFail(net, node)
  nodeEntry.asTypeCap = {}

  return findOutputPorts(net, node)[0]
}
