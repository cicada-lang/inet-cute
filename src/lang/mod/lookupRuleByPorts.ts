import { Mod } from "../mod"
import { Port } from "../port"
import { Rule } from "../rule"

export function lookupRuleByPorts(
  mod: Mod,
  first: Port,
  second: Port,
): Rule | undefined {
  if (first.isPrincipal && second.isPrincipal) {
    const firstKey = `${first.node.mod.url.href}${first.node.name}`
    const secondKey = `${second.node.mod.url.href}${second.node.name}`

    return mod.rules.get(`${firstKey} ${secondKey}`)
  }
}
