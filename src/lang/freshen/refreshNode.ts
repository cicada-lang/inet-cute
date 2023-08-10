import { Node } from "../node"
import { freshenType } from "./freshenType"

/*

  During `run`, no need to call `refreshNode` to refresh the types of a node.
  It will be expansive to do so.

  `refreshNode` is only called during `checking`.

*/

export function refreshNode(
  typeVarCounters: Map<string, number>,
  node: Node,
): void {
  const occurredNames = new Map()

  for (const port of [...node.input, ...node.output]) {
    port.t = freshenType(typeVarCounters, port.t, occurredNames)
  }
}
