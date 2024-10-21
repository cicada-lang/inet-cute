import { type Node } from "../node/index.js"
import { nodeKey } from "../node/nodeKey.js"
import { type Net } from "./Net.js"

export function deleteNodeEntry(net: Net, node: Node): void {
  net.nodeEntries.delete(nodeKey(node))
}
