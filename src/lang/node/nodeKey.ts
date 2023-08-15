import { Mod } from "../mod"

export function nodeKey(node: { mod: Mod; name: string }): string {
  return `${node.mod.url.href}/${node.name}`
}
