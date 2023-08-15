import { nodeKey } from "../node/nodeKey"
import { Port } from "../port"
import { Rule } from "../rule"

export function lookupRuleByPorts(first: Port, second: Port): Rule | undefined {
  if (first.isPrincipal && second.isPrincipal) {
    const firstKey = nodeKey(first.node)
    const secondKey = nodeKey(second.node)

    const key = `${firstKey} ${secondKey}`

    // With the following lookup, we will have a constraint that
    // to define a rule, one of the node must be owned by this module.
    return first.node.mod.rules.get(key) || second.node.mod.rules.get(key)
  }
}
