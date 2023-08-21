import { Node } from "../node"
import { nodeKey } from "../node/nodeKey"
import { Net, NodeEntry } from "./Net"

export function findNodeEntry(net: Net, node: Node): NodeEntry | undefined {
  return net.nodeEntries.get(nodeKey(node))
}
