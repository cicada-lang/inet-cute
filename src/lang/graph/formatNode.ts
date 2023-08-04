import { stringToSubscript } from "../../utils/stringToSubscript"
import { Node } from "../graph"

export function formatNode(node: Node): string {
  const subscript = stringToSubscript(node.id.toString())
  return `${node.name}${subscript}`
}
