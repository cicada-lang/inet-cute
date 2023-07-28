import { Node } from "../lang/graph"

export function formatNode(node: Node): string {
  return `${node.name}#${node.id}`
}
