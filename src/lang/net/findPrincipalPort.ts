import { formatNode, type Node } from "../node/index.js"
import { type Port } from "../port/index.js"
import { type Net } from "./Net.js"
import { createPortFromPortEntry } from "./createPortFromPortEntry.js"
import { findPortRecordOrFail } from "./findPortRecordOrFail.js"

export function findPrincipalPort(net: Net, node: Node): Port {
  const portRecord = findPortRecordOrFail(net, node)
  for (const portEntry of Object.values(portRecord)) {
    if (portEntry.isPrincipal) {
      return createPortFromPortEntry(node, portEntry)
    }
  }

  throw new Error(
    [
      `[findPrincipalPort] I expect the node to have a principal port.`,
      ``,
      `  node: ${formatNode(node)}`,
    ].join("\n"),
  )
}
