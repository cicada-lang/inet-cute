import { type Mod } from "../mod/index.ts"
import { addNode } from "../net/addNode.ts"
import { findNodeEntryOrFail } from "../net/findNodeEntryOrFail.ts"
import { findOutputPorts } from "../net/findOutputPorts.ts"
import { type Net } from "../net/index.ts"
import { type PortExp } from "../port/PortExp.ts"
import { type Port } from "../port/index.ts"
import { type Value } from "../value/index.ts"

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
