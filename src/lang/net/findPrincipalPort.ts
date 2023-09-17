import { Node, formatNode } from "../node"
import { Port } from "../port"
import { Net } from "./Net"
import { createPortFromPortEntry } from "./createPortFromPortEntry"
import { findPortRecordOrFail } from "./findPortRecordOrFail"

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
      `  node: ${formatNode(net, node)}`,
    ].join("\n"),
  )
}
