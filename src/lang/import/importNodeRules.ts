import { Mod } from "../mod"
import { NodeWithoutId, nodeKeyWithoutId } from "../node"

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
