import { Node } from "../node"
import { nodeKey } from "../node/nodeKey"
import { Net } from "./Net"
import { cloneNodeEntry } from "./cloneNodeEntry"
import { findNodeEntryOrFail } from "./findNodeEntryOrFail"

export function copyNode(source: Net, target: Net, node: Node): void {
  const entry = findNodeEntryOrFail(source, node)
  target.nodeEntries.set(nodeKey(node), cloneNodeEntry(entry))
}
