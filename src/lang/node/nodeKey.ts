import { Node } from "./Node"

export function nodeKey(node: Node): string {
  return `${node.url.href}/${node.name}#${node.id}`
}
