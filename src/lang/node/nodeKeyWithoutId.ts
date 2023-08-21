export function nodeKeyWithoutId(node: { url: URL; name: string }): string {
  return `${node.url.href}/${node.name}`
}
