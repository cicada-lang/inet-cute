import { Node } from "../lang/node"

export function formatNode(node: Node): string {
  return `${node.name}#${node.id}`
}
