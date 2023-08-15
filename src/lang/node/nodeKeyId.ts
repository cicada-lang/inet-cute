import { Node } from "./Node"

export function nodeKeyId(node: Node): string {
  return `${node.url.href}/${node.name}#${node.id}`
}
