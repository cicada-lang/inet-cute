import { NodeWithoutId } from "../node"
import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId"
import { Mod } from "./Mod"
import { RuleEntry } from "./RuleEntry"
import { hasNodeDefinition } from "./hasNodeDefinition"

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
