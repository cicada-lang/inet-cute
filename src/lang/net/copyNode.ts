import { Node } from "../node"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net } from "./Net"
import { cloneNodeEntry } from "./cloneNodeEntry"
import { findNodeEntryOrFail } from "./findNodeEntryOrFail"

export function copyNode(source: Net, target: Net, node: Node): void {
  const entry = findNodeEntryOrFail(source, node)
  target.nodeEntries.set(nodeKeyId(node), cloneNodeEntry(entry))
}
