import { type Node } from "../node/index.ts"
import { nodeKey } from "../node/nodeKey.ts"
import { type Net, type NodeEntry } from "./Net.ts"

export function findNodeEntry(net: Net, node: Node): NodeEntry | undefined {
  return net.nodeEntries.get(nodeKey(node))
}
