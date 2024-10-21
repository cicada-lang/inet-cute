import { type NodeWithoutId } from "../node/index.js"
import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId.js"
import { type Mod } from "./Mod.js"
import { type RuleEntry } from "./RuleEntry.js"
import { hasNodeDefinition } from "./hasNodeDefinition.js"

export function findNodeRuleEntries(
  mod: Mod,
  node: NodeWithoutId,
): Array<RuleEntry> {
  const nodeKey = nodeKeyWithoutId(node)
  const entries: Array<RuleEntry> = []
  for (const [key, entry] of mod.ruleEntries) {
    const [firstKey, secondKey] = key.split(" ")

    if (
      (firstKey === nodeKey || secondKey === nodeKey) &&
      hasNodeDefinition(mod, entry.second) &&
      hasNodeDefinition(mod, entry.first)
    ) {
      if (!entries.find(({ name }) => name === entry.name)) {
        entries.push(entry)
      }
    }
  }

  return entries
}
