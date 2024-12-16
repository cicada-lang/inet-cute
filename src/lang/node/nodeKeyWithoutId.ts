import { type NodeWithoutId } from "./Node.ts"

export function nodeKeyWithoutId(node: NodeWithoutId): string {
  return `${node.url.href}/${node.name}`
}
