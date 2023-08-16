import { Node } from "../node"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net } from "./Net"

export function deletePortRecord(net: Net, node: Node): void {
  net.nodePortRecords.delete(nodeKeyId(node))
}
