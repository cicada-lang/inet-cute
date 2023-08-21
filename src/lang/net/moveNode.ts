import { Node } from "../node"
import { nodeKey } from "../node/nodeKey"
import { Net } from "./Net"
import { findNodeEntryOrFail } from "./findNodeEntryOrFail"

export function moveNode(source: Net, target: Net, node: Node): void {
  const entry = findNodeEntryOrFail(source, node)
  target.nodeEntries.set(nodeKey(node), entry)
  source.nodeEntries.delete(nodeKey(node))
}
