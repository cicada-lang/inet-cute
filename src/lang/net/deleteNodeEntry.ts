import { Node } from "../node"
import { nodeKey } from "../node/nodeKey"
import { Net } from "./Net"

export function deleteNodeEntry(net: Net, node: Node): void {
  net.nodeEntries.delete(nodeKey(node))
}
