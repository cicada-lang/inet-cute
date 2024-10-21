import { type Node } from "./Node.js"

export function nodeKey(node: Node): string {
  return `${node.url.href}/${node.name}#${node.id}`
}
