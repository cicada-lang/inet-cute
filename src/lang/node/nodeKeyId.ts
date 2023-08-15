import { Node } from "./Node"

export function nodeKeyId(node: Node): string {
  return `${node.mod.url.href}/${node.name}#${node.id}`
}
