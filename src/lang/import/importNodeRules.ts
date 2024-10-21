import { type Mod } from "../mod/index.js"
import { nodeKeyWithoutId, type NodeWithoutId } from "../node/index.js"

export function importNodeRules(
  mod: Mod,
  targetMod: Mod,
  node: NodeWithoutId,
): void {
  const nodeKey = nodeKeyWithoutId(node)
  for (const [key, ruleEntry] of targetMod.ruleEntries) {
    const [firstKey, secondKey] = key.split(" ")

    if (firstKey === nodeKey || secondKey === nodeKey) {
      mod.ruleEntries.set(key, ruleEntry)
    }
  }
}
