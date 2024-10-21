import { type NodeWithoutId } from "./Node.js"

export function nodeKeyWithoutId(node: NodeWithoutId): string {
  return `${node.url.href}/${node.name}`
}
