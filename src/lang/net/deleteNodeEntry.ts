import { Node } from "../node"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net } from "./Net"

export function deleteNodeEntry(net: Net, node: Node): void {
  net.nodeEntries.delete(nodeKeyId(node))
}
