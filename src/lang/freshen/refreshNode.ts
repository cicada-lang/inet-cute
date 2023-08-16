import { Net } from "../net"
import { findNodePortRecordOrFail } from "../net/findNodePortRecordOrFail"
import { Node } from "../node"
import { freshenType } from "./freshenType"

/*

  During `run`, no need to call `refreshNode` to refresh the types of a node.
  It will be expansive to do so.

  `refreshNode` is only called during `checking`.

*/

export function refreshNode(
  net: Net,
  typeVarCounters: Map<string, number>,
  node: Node,
): void {
  const occurredNames = new Map()

  const portRecord = findNodePortRecordOrFail(net, node)
  for (const portEntry of Object.values(portRecord)) {
    portEntry.t = freshenType(typeVarCounters, portEntry.t, occurredNames)
  }
}
