import { NodeWithoutId } from "../node"
import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId"
import { Mod } from "./Mod"
import { RuleEntry } from "./RuleEntry"

export function findNodeRuleEntries(
  mod: Mod,
  node: NodeWithoutId,
): Array<RuleEntry> {
  const nodeKey = nodeKeyWithoutId(node)
  const entries = []
  for (const [key, entry] of mod.ruleEntries) {
    const [firstKey, secondKey] = key.split(" ")
    if (firstKey === nodeKey || secondKey === nodeKey) {
      entries.push(entry)
    }
  }

  return entries
}
