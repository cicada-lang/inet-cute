import { NodeWithoutId } from "../node/Node"
import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId"
import { Rule } from "../rule"
import { Mod } from "./Mod"

export function findRuleByNodes(
  mod: Mod,
  firstNode: NodeWithoutId,
  secondNode: NodeWithoutId,
): Rule | undefined {
  const firstKey = nodeKeyWithoutId(firstNode)
  const secondKey = nodeKeyWithoutId(secondNode)

  return (
    mod.ruleEntries.get(`${firstKey} ${secondKey}`) ||
    mod.ruleEntries.get(`${secondKey} ${firstKey}`)
  )
}
