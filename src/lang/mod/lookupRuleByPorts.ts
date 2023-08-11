import { Mod } from "../mod"
import { Port } from "../port"
import { Rule } from "../rule"

export function lookupRuleByPorts(
  mod: Mod,
  first: Port,
  second: Port,
): Rule | undefined {
  if (first.isPrincipal && second.isPrincipal) {
    return mod.rules.get(`${first.node.name} ${second.node.name}`)
  }
}
