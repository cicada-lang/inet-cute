import { nodeKey } from "../node/nodeKey"
import { Port } from "../port"
import { Rule } from "../rule"
import { Mod } from "./Mod"

export function lookupRuleByPorts(
  mod: Mod,
  first: Port,
  second: Port,
): Rule | undefined {
  if (first.isPrincipal && second.isPrincipal) {
    const firstKey = nodeKey(first.node)
    const secondKey = nodeKey(second.node)

    const key = `${firstKey} ${secondKey}`

    // With the following lookup, we will have a constraint that
    // to define a rule, one of the node must be owned by this module.

    const firstMod =
      mod.url.href === first.node.url.href
        ? mod
        : mod.loader.loaded.get(first.node.url.href)

    const secondMod =
      mod.url.href === second.node.url.href
        ? mod
        : mod.loader.loaded.get(second.node.url.href)

    return firstMod?.rules.get(key) || secondMod?.rules.get(key)
  }
}
