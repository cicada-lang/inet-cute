export function nodeKey(node: { url: URL; name: string }): string {
  return `${node.url.href}/${node.name}`
}
