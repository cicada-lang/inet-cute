import { type NodeWithoutId } from "../node/Node.js"
import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId.js"
import { type Rule } from "../rule/index.js"
import { type Mod } from "./Mod.js"

export function findRuleByNodes(
  mod: Mod,
  firstNode: NodeWithoutId,
  secondNode: NodeWithoutId,
): Rule | undefined {
  const firstKey = nodeKeyWithoutId(firstNode)
  const secondKey = nodeKeyWithoutId(secondNode)

  const key = `${firstKey} ${secondKey}`

  return mod.ruleEntries.get(key)
}
