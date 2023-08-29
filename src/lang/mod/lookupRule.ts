import { NodeWithoutId } from "../node/Node"
import { nodeKeyWithoutId } from "../node/nodeKeyWithoutId"
import { Rule } from "../rule"
import { Mod } from "./Mod"

export function lookupRule(
  mod: Mod,
  firstNode: NodeWithoutId,
  secondNode: NodeWithoutId,
): Rule | undefined {
  const firstKey = nodeKeyWithoutId(firstNode)
  const secondKey = nodeKeyWithoutId(secondNode)

  const key = `${firstKey} ${secondKey}`

  // With the following lookup, we will have a constraint that
  // to define a rule, one of the node must be owned by this module.

  const firstMod =
    mod.url.href === firstNode.url.href
      ? mod
      : mod.loader.loaded.get(firstNode.url.href)

  const secondMod =
    mod.url.href === secondNode.url.href
      ? mod
      : mod.loader.loaded.get(secondNode.url.href)

  return firstMod?.ruleEntries.get(key) || secondMod?.ruleEntries.get(key)
}
