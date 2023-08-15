import { Node } from "../node"
import { nodeKeyId } from "../node/nodeKeyId"
import { Net } from "./Net"

export function deleteNodePorts(net: Net, node: Node): void {
  net.nodePorts.delete(nodeKeyId(node))
}
