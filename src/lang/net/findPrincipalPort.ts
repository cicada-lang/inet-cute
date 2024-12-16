import { formatNode, type Node } from "../node/index.ts"
import { type Port } from "../port/index.ts"
import { type Net } from "./Net.ts"
import { createPortFromPortEntry } from "./createPortFromPortEntry.ts"
import { findPortRecordOrFail } from "./findPortRecordOrFail.ts"

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
