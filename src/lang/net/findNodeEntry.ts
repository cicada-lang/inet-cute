import { type Node } from "../node/index.js"
import { nodeKey } from "../node/nodeKey.js"
import { type Net, type NodeEntry } from "./Net.js"

export function findNodeEntry(net: Net, node: Node): NodeEntry | undefined {
  return net.nodeEntries.get(nodeKey(node))
}
