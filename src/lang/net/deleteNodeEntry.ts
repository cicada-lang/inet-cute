import { type Node } from "../node/index.ts"
import { nodeKey } from "../node/nodeKey.ts"
import { type Net } from "./Net.ts"

export function deleteNodeEntry(net: Net, node: Node): void {
  net.nodeEntries.delete(nodeKey(node))
}
