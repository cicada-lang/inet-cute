import { Node } from "../node"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net, NodeEntry } from "./Net"

export function findNodeEntry(net: Net, node: Node): NodeEntry | undefined {
  return net.nodeEntries.get(nodeKeyId(node))
}
