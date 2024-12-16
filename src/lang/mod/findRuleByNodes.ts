import { type NodeWithoutId } from "../node/Node.ts"
import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId.ts"
import { type Rule } from "../rule/index.ts"
import { type Mod } from "./Mod.ts"

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
