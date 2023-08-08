import { stringToSubscript } from "../../utils/stringToSubscript"
import { Node } from "../node"

export function formatNode(node: Node): string {
  const subscript = stringToSubscript(node.id.toString())
  return `${node.name}${subscript}`
}
