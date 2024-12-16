import { type Node } from "../node/index.ts"
import { nodeKey } from "../node/nodeKey.ts"
import { type Net } from "./Net.ts"
import { findNodeEntryOrFail } from "./findNodeEntryOrFail.ts"

export function moveNode(source: Net, target: Net, node: Node): void {
  const entry = findNodeEntryOrFail(source, node)
  target.nodeEntries.set(nodeKey(node), entry)
  source.nodeEntries.delete(nodeKey(node))
}
