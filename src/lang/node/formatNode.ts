import { stringToSubscript } from "../../utils/stringToSubscript.ts"
import { type Node } from "../node/index.ts"

export function formatNode(node: Node): string {
  const subscript = stringToSubscript(node.id.toString())
  return `${node.name}${subscript}`
}
