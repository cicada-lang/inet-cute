import { Node } from "../node"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net } from "./Net"

export function deleteNodePortEntries(net: Net, node: Node): void {
  net.nodePortEntriesMap.delete(nodeKeyId(node))
}
