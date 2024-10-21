import { type Node } from "../node/index.js"
import { nodeKey } from "../node/nodeKey.js"
import { type Net } from "./Net.js"
import { findNodeEntryOrFail } from "./findNodeEntryOrFail.js"

export function moveNode(source: Net, target: Net, node: Node): void {
  const entry = findNodeEntryOrFail(source, node)
  target.nodeEntries.set(nodeKey(node), entry)
  source.nodeEntries.delete(nodeKey(node))
}
