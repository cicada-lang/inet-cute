import { stringToSubscript } from "../../utils/stringToSubscript"
import { Net } from "../net"
import { Node } from "../node"

export function formatNode(net: Net, node: Node): string {
  const subscript = stringToSubscript(node.id.toString())
  return `${node.name}${subscript}`
}
