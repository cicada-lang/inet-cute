import { stringToSubscript } from "../../utils/stringToSubscript.js"
import { type Node } from "../node/index.js"

export function formatNode(node: Node): string {
  const subscript = stringToSubscript(node.id.toString())
  return `${node.name}${subscript}`
}
