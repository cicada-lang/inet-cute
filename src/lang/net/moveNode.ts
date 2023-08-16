import { Node } from "../node"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net } from "./Net"
import { findNodeEntryOrFail } from "./findNodeEntryOrFail"

export function moveNode(source: Net, target: Net, node: Node): void {
  const entry = findNodeEntryOrFail(source, node)
  target.nodeEntries.set(nodeKeyId(node), entry)
  source.nodeEntries.delete(nodeKeyId(node))
}
