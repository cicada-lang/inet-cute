import { NodeWithoutId } from "../node"
import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId"
import { Rule } from "../rule"
import { Mod } from "./Mod"

export function findNodeRules(mod: Mod, node: NodeWithoutId): Array<Rule> {
  const nodeKey = nodeKeyWithoutId(node)
  const rules = []
  for (const [key, rule] of mod.rules) {
    const [firstKey, secondKey] = key.split(" ")
    if (firstKey === nodeKey || secondKey === nodeKey) {
      rules.push(rule)
    }
  }

  return rules
}
